import SassSourceMaps from 'broccoli-sass-source-maps'
import CleanCss from 'broccoli-clean-css'
import Sass from 'sass'
import merge from 'broccoli-merge-trees'

const compileSass = SassSourceMaps(Sass)

const appRoot = 'src'
const appStyles = compileSass([appRoot], 'styles/app.sass', 'app.css')
const appDarkStyles = compileSass(
  [appRoot],
  'styles/app-dark.sass',
  'app-dark.css'
)

const minStyles = new CleanCss(appStyles)
const minDarkStyles = new CleanCss(appDarkStyles)

export default () => merge([minStyles, minDarkStyles])
