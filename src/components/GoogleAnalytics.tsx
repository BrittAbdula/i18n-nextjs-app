import Script from 'next/script'

const GoogleAnalytics = ({ gaId }: { gaId : string}) => {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}');
        `}
      </script>
    </>
  )
}

export default GoogleAnalytics