'use client';

import { useState, useRef } from 'react';
import { Upload, Video, X, Clock, AlertCircle } from 'lucide-react';
import { LANGUAGES, REGIONS, ContestSubmission } from '@/types';
import { contestApi } from '@/lib/api';
import { validateVideoFile, getVideoDuration } from '@/lib/utils';
import toast from 'react-hot-toast';

interface VideoUploadProps {
  onSuccess: () => void;
}

export function VideoUpload({ onSuccess }: VideoUploadProps) {
  const [formData, setFormData] = useState({
    language: '',
    region: '',
    caption: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle file selection
  const handleFileSelect = async (file: File) => {
    const validation = validateVideoFile(file);
    
    if (!validation.isValid) {
      toast.error(validation.error!);
      return;
    }

    try {
      const duration = await getVideoDuration(file);
      
      if (duration > 60) {
        toast.error('Video must be 60 seconds or less');
        return;
      }

      setSelectedFile(file);
      setVideoDuration(duration);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      
      toast.success('Video selected successfully!');
    } catch (error) {
      toast.error('Failed to process video file');
      console.error('Video processing error:', error);
    }
  };

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  // Remove selected video
  const removeVideo = () => {
    setSelectedFile(null);
    setVideoPreview(null);
    setVideoDuration(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error('Please select a video file');
      return;
    }

    if (!formData.language || !formData.region || !formData.caption.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setUploading(true);
    
    try {
      const submission: ContestSubmission = {
        language: formData.language,
        region: formData.region,
        caption: formData.caption.trim(),
        video: selectedFile,
      };

      const response = await contestApi.submitEntry(submission);
      
      if (response.success) {
        toast.success('✅ Video submitted successfully!');
        
        // Reset form
        setFormData({ language: '', region: '', caption: '' });
        removeVideo();
        
        // Notify parent component
        onSuccess();
      } else {
        toast.error(response.error || 'Failed to submit video');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit video');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Video Upload Area */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Video Upload (MP4 only, max 60 seconds)
        </label>
        
        {!selectedFile ? (
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive
                ? 'border-indigo-400 bg-indigo-50/50 scale-105'
                : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4"
              onChange={handleFileInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload video file"
            />
            
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-fit mx-auto">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Click to upload
                </span>{' '}
                or drag and drop
              </div>
              <p className="text-xs text-slate-500 font-medium">MP4 files only, max 60 seconds</p>
            </div>
          </div>
        ) : (
          <div className="relative bg-slate-50/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                  <Video className="h-5 w-5 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {selectedFile.name}
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                  </p>
                  {videoDuration && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{videoDuration.toFixed(1)}s</span>
                    </div>
                  )}
                </div>
                
                {/* Video Preview */}
                {videoPreview && (
                  <div className="mt-3">
                    <video
                      ref={videoRef}
                      src={videoPreview}
                      controls
                      className="w-full max-w-xs rounded-md"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                )}
              </div>
              
              <button
                type="button"
                onClick={removeVideo}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
                aria-label="Remove video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {videoDuration && videoDuration > 60 && (
              <div className="mt-3 flex items-center space-x-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>Video is too long. Maximum duration is 60 seconds.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Language Selection */}
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
          Language Spoken
        </label>
        <select
          id="language"
          value={formData.language}
          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
          required
          aria-label="Select language spoken in video"
        >
          <option value="">Select a language</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Region Selection */}
      <div>
        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
          Region
        </label>
        <select
          id="region"
          value={formData.region}
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
          required
          aria-label="Select your region"
        >
          <option value="">Select a region</option>
          {REGIONS.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* Caption */}
      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-2">
          Caption
        </label>
        <textarea
          id="caption"
          value={formData.caption}
          onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
          rows={3}
          maxLength={200}
          placeholder="Describe your video (max 200 characters)"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white/80 backdrop-blur-sm"
          required
          aria-label="Enter video caption"
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.caption.length}/200 characters
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={uploading || !selectedFile || (videoDuration !== null && videoDuration > 60)}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Submit video entry"
      >
        {uploading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Uploading...</span>
          </div>
        ) : (
          'Submit Video'
        )}
      </button>
    </form>
  );
}