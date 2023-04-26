export const getCurrentTabData = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

  const requiredData = {
    title: tabs[0].title,
    url: tabs[0].url,
    favIconUrl: tabs[0].favIconUrl,
  };

  return requiredData;
};
