(() => {
  function loadPreview(content) {
      document.getElementById('preview').innerHTML = marked.parse(content)
  }

  function setupTheme(json) {
      const config = JSON.parse(json)
      
      const root = document.querySelector('#preview')
      Object.entries(config.markdownTheme).forEach(([key, value ]) => {
          root.style.setProperty(key, value)
      })
  }
  
  function initHeightObserver() {
      const body = document.body
      const resizeObserver = new ResizeObserver(entries => {
          for (let entry of entries) {
              const height = entry.target.clientHeight
              console.log(`Height changed: ${height}`);
              window.webkit?.messageHandlers?.onHeightChanged.postMessage(height)
          }
      });
  
      resizeObserver.observe(body)
  }
  
  document.addEventListener('DOMContentLoaded', () => {
      initHeightObserver()
  })

  window.loadPreview = loadPreview
  window.setupTheme = setupTheme
})()
