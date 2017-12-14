/* eslint-disable */
// for ie
if (!window.location.origin) {
  var local = window.location;
  window.location.origin = local.protocol + '//' + local.hostname + (
    local.port ? (':' + local.port) : ''
  );
}
