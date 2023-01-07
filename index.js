/**
 * @format
 */
import { AppRegistry } from 'react-native';
import { Dirs } from 'react-native-file-access';
import 'react-native-gesture-handler';

import { CacheManager } from '@georstat/react-native-image-cache';

import { name as appName } from './app.json';
import { App } from './app/App';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 0,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
  getCustomCacheKey: (source) => {
    // Remove params from the URL for caching images (useful for caching images from Amazons S3 bucket and etc)
    let newCacheKey = source;
    if (source.includes('?')) {
      newCacheKey = source.substring(0, source.lastIndexOf('?'));
    }
    return newCacheKey;
  },
};
AppRegistry.registerComponent(appName, () => App);
