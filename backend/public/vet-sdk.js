(function () {
  const scriptTag = document.currentScript;
  const renderUrl = "https://vet-chatbot-sdk.onrender.com"
  // Create the container
  const container = document.createElement('div');
  container.id = 'vet-chatbot-container';
  Object.assign(container.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '999999',
    width: '400px',
    height: '600px'
  });

  // Create the Iframe
  const iframe = document.createElement('iframe');
  iframe.src = renderUrl;
  Object.assign(iframe.style, {
    width: '100%',
    height: '100%',
    border: 'none',
    background: 'transparent'
  });

  container.appendChild(iframe);
  document.body.appendChild(container);
})();