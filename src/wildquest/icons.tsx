import React from 'react';
import {
  Camera, Leaf, Trophy, Compass, Binoculars, PawPrint, Bird, MapPin,
  Users, Award, Star, Home, Search, Heart, MessageCircle, Share2,
  Bookmark, Menu, X, LogOut, Settings, Upload, ChevronRight, Sparkles,
  Shield, CheckCircle2, ImagePlus, Lock, TrendingUp, Calendar, Target,
} from 'lucide-react';

export const Icons = {
  Camera, Leaf, Trophy, Compass, Binoculars, PawPrint, Bird, MapPin,
  Users, Award, Star, Home, Search, Heart, MessageCircle, Share2,
  Bookmark, Menu, X, LogOut, Settings, Upload, ChevronRight, Sparkles,
  Shield, CheckCircle2, ImagePlus, Lock, TrendingUp, Calendar, Target,
};

export const badgeIcon = (name: string, cls = 'w-6 h-6') => {
  const map: Record<string, React.ReactNode> = {
    camera: <Camera className={cls} />, bird: <Bird className={cls} />,
    paw: <PawPrint className={cls} />, leaf: <Leaf className={cls} />,
    compass: <Compass className={cls} />, mappin: <MapPin className={cls} />,
    trophy: <Trophy className={cls} />, community: <Users className={cls} />,
    star: <Star className={cls} />,
  };
  return map[name] || <Award className={cls} />;
};
