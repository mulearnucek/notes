"use client";
import React, { useState, useEffect, use } from 'react';
import { FaYoutube, FaPlay } from 'react-icons/fa';
import Link from 'next/link';
import { generateThumbnailUrl } from '@/lib/utils';
import { PlaylistItem } from '@/lib/data';
import Image from 'next/image';


export const PlaylistCard: React.FC<{ playlist: PlaylistItem }> = ({ playlist }) => {
    const thumbnail = generateThumbnailUrl(playlist.Link, 'mqdefault');
    
    return (
      <Link
        href={playlist.Link}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >        <div className="bg-black/50 rounded-lg overflow-hidden backdrop-blur-md border border-gray-600 hover:border-red-500/50 transition-all duration-300 hover:bg-black/70 transform hover:scale-105">
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden bg-gray-800">
            {false ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
              </div>
            ) : (
              <Image
                src={thumbnail}
                alt={playlist.Title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            )}
            
            {/* Play Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-red-600 rounded-full p-2">
                <FaPlay className="text-white text-sm ml-0.5" />
              </div>
            </div>            {/* Module Badge */}
            <div className="absolute top-1.5 left-1.5 bg-black/70 backdrop-blur-md border border-gray-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {playlist.Module}
            </div>

            {/* Video Count */}
            <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
              {playlist.VideosCount} videos
            </div>
          </div>

          {/* Content */}
          <div className="p-2.5">
            <h3 className="font-semibold text-xs sm:text-sm text-white group-hover:text-red-400 transition-colors duration-300 mb-1.5 overflow-hidden" 
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
              {playlist.Title}
            </h3>
            
            <div className="flex items-center justify-between text-xs text-white/70">
              <div className="flex items-center gap-1">
                <FaYoutube className="text-red-500 text-xs" />
                <span>Playlist</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

export default PlaylistCard;
