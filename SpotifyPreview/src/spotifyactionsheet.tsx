import { React, Toasts, Constants } from "enmity/metro/common";
import { getModule, getByName, getByProps } from "enmity/metro";

const { ThemeColorMap } = Constants;

const ActionSheet = getByProps("ActionSheet")?.ActionSheet ?? getModule((x) => x.render?.name === "ActionSheet", {});
const LazyActionSheet = getByProps("openLazy", "hideActionSheet");

// https://discord.com/channels/1015931589865246730/1062531774187573308/1117197626648039494 — Thanks Rosie on Vendetta Discord
function renderActionSheet(component: any, props: { [key: string]: any }) {
  ActionSheet
    ? LazyActionSheet?.openLazy(new Promise(r => r({ default: component })), "ActionSheet", props)
    : Toasts.open("You cannot open ActionSheets on this version! Upgrade to 163+");
};

const { BottomSheetScrollView } = getByProps("BottomSheetScrollView");

const WebView = getByName("WebView") || getByProps("WebView").default.render;
let wv = (link)=>{ 
  console.log(WebView);
    const bgcolor = ThemeColorMap.MODAL_BACKGROUND;
    return (
        <WebView
          source={{ uri: link }}
          style={{ marginTop: 20, backgroundColor: bgcolor, height: 100, width: "100%" }}
        />
      );
};

function as([link]) {
    return (
        <ActionSheet>
            <BottomSheetScrollView contentContainerStyle={{ marginBottom: 100 }}>
            {wv(link.replace('https://open.spotify.com', 'https://open.spotify.com/embed'))}
            </BottomSheetScrollView>
        </ActionSheet>
        );
}

export default function show(url) {
  renderActionSheet(as, [url]);
};