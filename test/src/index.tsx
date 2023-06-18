import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';
import show from './spotifyactionsheet';

const Patcher = create('spotify-preview');

const handleClick = getByProps("handleClick");

const SpotifyPreview: Plugin = {
   ...manifest,

   onStart() {
      Patcher.instead(handleClick, "handleClick", (self, args, orig) => {
         const { href } = args[0];
         if (!href) return orig.apply(self, args); // calls original function
         const isSpotify = href.startsWith("https://open.spotify.com/");
         if (!isSpotify) return orig.apply(self, args); // calls original function
         show(href);
      });
   },

   onStop() {
      Patcher.unpatchAll();
   }
};

registerPlugin(SpotifyPreview);
