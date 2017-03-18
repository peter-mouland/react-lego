
export default function mapWebpackAssets(assetsObj) {
  const assets = { javascript: [], styles: [] };
  Object.keys(assetsObj).forEach((key) => {
    const js = assetsObj[key].js;
    const css = assetsObj[key].css;
    if (js && key === 'vendor') {
      assets.javascript.unshift(js);
    } else if (js) {
      assets.javascript.push(js);
    }
    if (css) assets.styles.push(css);
  });
  return assets;
}
