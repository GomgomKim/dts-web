import Link from 'next/link'

import DoThingsStudioLogo from '/public/icons/do-things-studio.svg'

export const Footer = () => {
  const bar =
    "relative pl-[.625rem] before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:ml-[.3125rem] before:h-[0.75rem] before:w-px before:bg-neutral-5 before:content-['']"

  return (
    <footer className="m-auto flex max-w-[1136px] flex-wrap gap-[2.8125rem] py-20 md:pb-40 min-[3200px]:max-w-[1646px] 2xl:max-w-[2184px]">
      <div className="flex min-h-14 flex-col justify-between">
        <div>
          <DoThingsStudioLogo />
        </div>
        <p className="text-[.875rem] text-neutral-7">
          © Growdle Corp. All Rights Reserved.
        </p>
      </div>
      <div className="flex min-h-20 flex-col flex-nowrap justify-between">
        <dl className="text-nowrap text-neutral-5 [&_*]:text-[.875rem] [&_dd]:inline [&_div]:inline-block [&_dt]:inline">
          <div>
            <dt>회사이름: </dt> <dd>(주) 그로들</dd>
          </div>
          <div className={bar}>
            <dt>대표: </dt> <dd>김규영</dd>
          </div>
          <div className={bar}>
            <dt>사업자 등록번호: </dt> <dd>110111-8076302</dd>
          </div>
          <div className={bar}>
            <dt>통신판매업 신고번호: </dt> <dd>2023-서울강남-04137</dd>
          </div>
          <br />
          <div>
            <dt>주소: </dt> <dd>서울시 강남구 테헤란로20길 9 동궁빌딩 12층</dd>
          </div>
          <div className={bar}>
            <dt>대표번호: </dt> <dd>02-567-0925</dd>
          </div>
          <div className={bar}>
            <dt>호스팅 서비스:</dt> <dd>AWS</dd>
          </div>
        </dl>
        <div>
          <Link
            href="mailto:contact@dothings.studio"
            className="text-[0.875rem] text-neutral-7"
          >
            contact@dothings.studio
          </Link>
          <span className="ml-10 text-neutral-7 *:text-[0.875rem]">
            <Link
              href="https://www.notion.so/ec82e5e0bba54f4b8a4ca2229eb16a22?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-[.4375rem]"
            >
              이용약관
            </Link>
            <Link
              href="https://www.notion.so/2b06e9bc71ab4d26bdcdd9cec7c8edae?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
            >
              개인정보처리방침
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
