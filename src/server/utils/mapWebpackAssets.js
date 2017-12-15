
export default function mapWebpackAssets(assetsObj) {
  const assets = { javascript: [], styles: [] };
  Object.keys(assetsObj).forEach((key) => {
    const { js, css } = assetsObj[key];
    if (js && key === 'polyfills') {
      assets.javascript.unshift(`
        <script>
        // synchronously polyfill stuff needed for the app in old browsers
        if (!window.location.origin || !window.Promise || !Array.prototype.find) {
          let js = document.createElement('script');
          js.src = '${js}'
          document.body.appendChild(js);
        }
        </script>
      `);
    } else if (js && key === 'vendor') {
      assets.javascript.unshift(`<script src=${js}></script>`);
    } else if (js) {
      assets.javascript.push(`<script src=${js}></script>`);
    }
    if (css) assets.styles.push(`<link href=${css} rel="stylesheet" />`);
  });
  return assets;
}
