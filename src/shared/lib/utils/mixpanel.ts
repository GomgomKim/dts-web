import mixpanel from 'mixpanel-browser'

const isDev = process.env.NODE_ENV === 'development'

function initialize() {
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

export const track = {
  initialize
}
