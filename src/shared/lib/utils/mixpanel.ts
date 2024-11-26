import mixpanel from 'mixpanel-browser'

const isDev = process.env.NODE_ENV === 'development'

const initialize = () => {
  const test = process.env.NEXT_PUBLIC_MIXPANEL_TEST_TOKEN
  const live = process.env.NEXT_PUBLIC_MIXPANEL_LIVE_TOKEN

  let token = ''

  if (isDev) {
    token = test!
  } else {
    token = live!
  }

  mixpanel.init(token, {
    debug: isDev,
    // track_pageview: true,
    persistence: 'localStorage'
  })
}

type EventName =
  | 'select_model'
  | 'favorite_model'
  | 'generate_image'
  | 'download_image'
  | 'click_signup'

const sendToMixpanel = (eventName: EventName, eventProperties = {}) => {
  const additionalProperties = {
    // $user_id: 'userUUID',
    // $browser: navigator.userAgent,
    // $current_url: window.location.href,
    // $device_id: navigator.userAgent,
    // $initial_referrer: document.referrer ? document.referrer : undefined,
    // $initial_referring_domain: document.referrer
    //   ? new URL(document.referrer).hostname
    //   : undefined,
    // $screen_height: window.screen.height,
    // $screen_width: window.screen.width
  }

  const properties = { ...eventProperties, ...additionalProperties }

  mixpanel.track(eventName, properties)
}

export const track = {
  initialize,
  sendToMixpanel
}
