const formatFullUrl = (url: string) => {
  let baseAddr = import.meta.env.VITE_API_URL;

  if (!baseAddr) {
    throw new Error("VITE_API_URL is not set");
  }

  if (baseAddr[baseAddr.length - 1] === "/") {
    baseAddr = baseAddr.slice(0, baseAddr.length - 1);
  }

  if (url[0] === "/") {
    url = url.slice(1);
  }

  return baseAddr + "/" + url;
};

export { formatFullUrl };
