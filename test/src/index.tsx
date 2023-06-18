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
      Patcher.before(handleClick, "handleClick", function (_, [args]) {
         const { href } = args;
         const isSpotify = href.startsWith("https://open.spotify.com/");
         if (!isSpotify) return;
         args.href = undefined;
         show(href);
     });
   },

   onStop() {
      Patcher.unpatchAll();
   }
};

registerPlugin(SpotifyPreview);
