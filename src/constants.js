export const IS_PROD: boolean = process.env.NODE_ENV === 'production'

export const CLIENT_URL: string = IS_PROD
  ? `${window.location.protocol}//${window.location.host}`
  : 'http://localhost:8000'

export const PUBLIC_STRIPE_KEY: string = IS_PROD
  ? 'pk_live_z9sqsmu2zPUSaCYgLmfoHSNm'
  : 'pk_test_eU1Cn0yK7HTAPZeXjA0uwWL8'
