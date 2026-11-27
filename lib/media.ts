/** Whether photographs and videos go straight to the public media store (on the host, once it is connected) or are saved by the form (on the developer's machine). */
export const mediaReady = () => Boolean(process.env.MEDIA_READ_WRITE_TOKEN);
