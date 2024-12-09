import Dahye from '/public/images/dahye-1_1-FRONT-watermark.webp'
import Dayoung from '/public/images/dayoung-1_1-FRONT-watermark.webp'
import Yewon from '/public/images/yewon-1_1-FRONT-watermark.webp'
import Yuna from '/public/images/yuna-1_1-FRONT-watermark.webp'
import Yuri from '/public/images/yuri-1_1-FRONT-watermark.webp'

import { EditsCardItem } from './edits-card-item'

export const EditsCardItems = () => {
  const images = [
    { src: Yuna, alt: 'Yuna' },
    { src: Yewon, alt: 'Yewon' },
    { src: Yuri, alt: 'Yuri' },
    { src: Dayoung, alt: 'Dayoung' },
    { src: Dahye, alt: 'Dahye' }
  ]

  return (
    <ul className="grid-edits-medium grid gap-5">
      {images.map((image) => (
        <li key={image.alt}>
          <EditsCardItem src={image.src} alt={image.alt} />
        </li>
      ))}
    </ul>
  )
}
