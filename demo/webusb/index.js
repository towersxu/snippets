document.addEventListener('DOMContentLoaded', async () => {
  let devices = await navigator.usb.getDevices();
  devices.forEach(device => {
    // Add |device| to the UI.
    console.log(device)
  });
});