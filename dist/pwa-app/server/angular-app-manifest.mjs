
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/todos",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/tasks"
  },
  {
    "renderMode": 2,
    "route": "/todos"
  },
  {
    "renderMode": 2,
    "route": "/weather"
  },
  {
    "renderMode": 2,
    "route": "/photo"
  },
  {
    "renderMode": 2,
    "route": "/media"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 22789, hash: '6742564c023743d72cfbd2877a40a0a07a13eed8c4f9efcdb73e7542cd23ce0c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 18476, hash: '6b81625c48f5e4dc02594d68cdf6ba665f3b3f98be841209be96fdd99664bd49', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'todos/index.html': {size: 49973, hash: '96d743f644eeaa812311cb9c2d9453bd7f5f767b50acd4fa92bb25430a886d3b', text: () => import('./assets-chunks/todos_index_html.mjs').then(m => m.default)},
    'media/index.html': {size: 49010, hash: 'bb015a469f2cf2251eadc60f44b3bf2d9b07a1c2f0803ef1200311bcacc9b4bc', text: () => import('./assets-chunks/media_index_html.mjs').then(m => m.default)},
    'weather/index.html': {size: 44424, hash: '7541f0bab237254729b5d2c476fe9fbce5490d204256a48bde67c00ed4a768f0', text: () => import('./assets-chunks/weather_index_html.mjs').then(m => m.default)},
    'tasks/index.html': {size: 44943, hash: '8cd60a58d5dd090b0472479634268bde075eb1d073de8dd168a87da45b7d390d', text: () => import('./assets-chunks/tasks_index_html.mjs').then(m => m.default)},
    'photo/index.html': {size: 56053, hash: '3b696bfbe3af9249a68adb79e58245fa864d5df7ae33d310e5d134dbfd270511', text: () => import('./assets-chunks/photo_index_html.mjs').then(m => m.default)},
    'styles-GUAYCYKX.css': {size: 264461, hash: 'XRsx2dU5QRM', text: () => import('./assets-chunks/styles-GUAYCYKX_css.mjs').then(m => m.default)}
  },
};
