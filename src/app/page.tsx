import Hero from "@/components/Hero";
import motion from "framer-motion";
import Footer from "@/components/Homefooter";
import Link from "next/link";
import { BlogPreview } from "@/components/BlogPreview";
import { EventPreview } from "@/components/EventPreview";
import { ContestantPreview } from "@/components/ContestantPreview";


export default function Home(){

  return(

    <div  className="page active">
      <Hero />

      {/* other sections later */}

      {/*!-- MARQUEE -->*/}
      <div className="marquee-strip">
        <div className="marquee-track">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
            </svg>AdaomaIgbonile Beauty Pageant
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0}}>
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
            <line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/>
            <line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/>
            <line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/>
              <line x1="17" y1="7" x2="22" y2="7"/>
            </svg>Odenigwe Reality TV
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>Igbo Talent Hunt
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>Dance Competition
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0}}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>Comedy Showdown
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>Quiz Competition
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
            </svg>AdaomaIgbonile Beauty Pageant
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <line x1="2" y1="7" x2="7" y2="7"/>
              <line x1="2" y1="17" x2="7" y2="17"/>
              <line x1="17" y1="17" x2="22" y2="17"/>
              <line x1="17" y1="7" x2="22" y2="7"/>
            </svg>Odenigwe Reality TV
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>Igbo Talent Hunt
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>Dance Competition
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>Comedy Showdown
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0}}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>Quiz Competition
          </span>
        </div>
      </div>

      {/* Streaming Promo */}
      <section className="section" style={{paddingTop: "50px", paddingBottom: "50px"}}>
        <div className="container">
          <div className="streaming-promo">
            <img src="data:image/webp;base64,UklGRsZuAABXRUJQVlA4ILpuAABQhgGdASqQAZABPlEijUUjoiMVDCWEOAUEsTaYewZpItv65chrXHFPS+W0A5tqQ0mD75FWz9VvS9GLxv26+4vwf7P/wfzF/z/BbsP6VfiF6D/5H+G/KL5W/9v1r/q//2f4j4BP1h/X3sE/4X/teov9sv2u92T/i/sV7wv7d/xfYE/p3+w///YcfvX7DX70+nN+7Xwt/27/j/uh8Dn7N///2AP//7Zv8A//+au8MfyT6f/M/4X9wf8X7rujPs81FPl/34/Xf5f94/cL/n+Pfzl/2/UL/Kv6J/nPzY96f8TwCdZ/5noI+232b/f/5X97P8b6dH+16Pfqn+a9gL+Z/2f/i/nD8af6nwhPzP/e9gX+g/4X/mf5n80Ppc/wf/f/rPyi9wf6V/r//h/qfgI/m/9v/5/+K9u3/5+7X94f/b7v/7cngH+6IdYhQl6bMD02pldRiOzhy2r38C7kOhuuNEpAT4eGAY5MbVBbhI/uF8NGEN9l+T7MSBqLEzNXBTSy1JcLTocvfki0jLeGmbkLPme1sraHT3shf/cSEkAk/nVapDxqq5xv3hajgtBdrvftJTAnNKEwLTkD8e3J8t2CCBboBHptbWwxk+3V4mUsyubQdzCcCZDSNpoZzSbBiA///bOccQtxATX8JvM+4J1NP43AMe9rsvAoU21mtAtZGP5MvusHNCXoy15CvdY0LpWk0C3eyGm7/qumOtCzippIJZ/WJ5LmCJiQJtu2MtfeIdrdeBzJiTn+2t3x6Jwo4PVDrTGZLI6jjLiDu0ZF101tFIdUxVnQ2VNaTOoz9ppEVJo9ZJ6jn76gKqWirD1XZY7Wdt48Er3d+5P+ObLZNbI/GgeybfLz54usuFdj9DuZtD0XlqwXf1UJCTB7+jdgllxsFaDosI/GFULeT3ok8EC3qDsCkIJh+Xl2O4D89eVg88cbGKx88d25O/t1PsZQz2XdaUQ7DwmXsbXFURqlvaU/F2vKvmybk+b3pmmtLeZKZ3YSV+7GXZEircfhT+jQAJ8gaBvGCX5/YTu9/F8QreVpGuk04mx6SUZZ5u3OtVYvhwfo2oExMLzH/rkZy55BTYRZ+2Ys+fdvC1Bo1+E7jFhjB0a5EmdwSkKv8UPLA0uth/6r/lKXQnTftK+bLjI+8A7xLJVIuDrqM14hMxB/4iCrCJbzhkdIGBRtEWuyRDh/jMyM1EtkPaDQRwh8A1sYxyLaPwACz9+JQ0uiz1Uq0vaiMe+YZUmyB8K7nqhubNx2BvrzvAGgr3gvLp3zJwO6qREahmySVBlDz9zVbJwGf84vBdNbILkNsdvUW2/lp2YNDqTbLCen6EK1VYgJ+ZURd8xob4QeA8H1T+OQGgV4+gxRe1+FROxzCrrh3iu92tnPG5ESEKKKS4fjoMMSQG3N6HkH9ZzQtCLJm3VpflSbtubSaGw0+IGEapc6UMipQnjmCxKKz/2bGLy9OnuaWVYhkIXJEfLnw99SE1n+xYiKJJ2DS2yE7y1YdpjfQwVAlYkxesqGxjSAzejxU77oA0bOwfZaZnprQX0ny7YsVlemJbaB5O/a+KQ2XWIjKt0aLGHWNWB8te+HHi2t07JnzrrExfYAN44Rd3fnUpbVa3oXk7rNRnKFoFMz5x53lfwNp9oVgaba1LAdrrdM9qPRWoGSt8hpsXw25FfkfILkQ4cfrlsqzChITurDJYjsxcokfYGpMJEMYttq1ikr6w7g8J9DQiLWhlrENxw7HGqedW44c+9fFhl2j+IrwEBIvPFrE1X+TqFEIeeyb2LxCbHMefuC3ykdzjDgWdQ0AFXEJZbAT/qZloIAD35gtM/KaskricPUje0WZ7PBQD2TKiglKyhFDcyPbB7qBuf7niE12zJ7mxMARm32nVz55EneiNSwqSgzp/pp8+wZFtu0nabL475qZMF339Ske0/4ZACCaybKfgN1ptNW2KxUjhi7rNE7X5y6uEdwtUXL8m+7sUEAVN23Z8Q+PQyRctcKSce/xj7lfn0xMLem8TeDOGlGDFDVGdSwHYjKSSVdwyDvwgCE/8iFbahczSId62PnMRTJX7lKNnp/S5BtBCLM28z6+W94clXyDBSErVmnbaufa5PkBgfTC77F9NrXknlWU7nIzd/XN+ixApOkSK+ZgfiodDzeTofQVMLMT1QAWH8+JXm9gf1bgQRcbsuLNJcqjHGu1JFHHqIxSqpf0EYlWFYxXuHgy6bVHkbBaNhr4G/ss0ypj6banPvkWjvrBZx+LbT80U5BB3da4gNyKkL4fPSc2DyA5KO13X3Rn54L5cWgd7/phU/OUwN+7VPiq4hoeyU12Ij2Ey+r5iUVJ7ddDDT86roLgV67idt82lNHtwv6c6/w5HVCkFnQz0ZkKhEz+ZPOr8uL+72JqMYuZlgSTb/noTYH0p5c3tQ+mWvNa/7U5G14a0vLrbusb7940Y0OReEkECKJiaMpo4HcONwGJa6JTiXhXdlyVHrjttjOBuRJgEztFjO0OzWohK+CW0wiYC1PRW2YhRGcrB6w68PWmSGvpHbfNhXz3pcnga25sltHw0R0WsXZWi/aGIqZq71u0EYI+dzXkywC6oKW7Yp0cafTiTvaGyVwU7QTK07wP5Ip7HVgAyGOJT5WSgDTx5Sf+sBbxor+hOXFRyh+WTy4zcxkEx2DwEtjQSgO6uqv5+Od7OYHUdKP9PcND3Z8NSONOkOCTQZTtaZeGch+kQMAVUV+KeNqDwewHtSS0mU7BorFvomFbfy0ouXp54iPDsKvKszdOnRBmHJHjPUgvRi+piOS4++UU/0Pfx2RjcSb+TDs8V7vs2QZTtx0TRCLdorSUPu+pwzn+i0t9O+fH0IQoQpZfPm85oibMQpluX5RH+Kq/jPogmukvKNL/wSLhNMp4/xL6oKCZQtJ8QbD9ICmLs4dWlAuEs60SrtVSre4VI831/Gcoe6iYMs5b9MWLjneliQAeF7VcYYm90qSruhnqHBgd6PYlGliBnlW+IjY3SD7dPhKY288A299pqO7J/0VS7ZF6NQCbF4l5ZTNRzYWCHPEbGWnMsDPD9Jj1Yj0Y0fqcLD5VwtbW+mAZGVQICBMzG4Up7dayBmENCc5SINXU2L+5EQ5zlAInay68JW8qs+5XrpSuwe3831LGFujZF3rTTBf2h9fEUKpDUq4HtkSHaeUhAQ0dMKpWmBz6VlnQC5Z3FVxUEN7Mu12GyFl4Km7c/LAC22Kk12GSNDZ26HMcoETozzEy29NkPL2WiQZjckfPpG2n/aGvVwc4UC6t741TbvN06xVL+R9OVzJ725Y9MuwFo+0GnKjP8G5FcubyFov2EokTWulcoyNVNW7ai2vlmx/z8fqdfdG/GO+rIJmCp2PyP9IUYYqVtDys40TD9kKqLgaRkSPdiVrhna1EhCHXwicUPnZdg2QdwmR/MizfKsUvwG19xEw2j94IDrmtx2f5ppPq4qYcnqVeFYuD3CSWmFH8NeMCtyFmTaYiyjRdIqvrSvPmql++O4LBDYU98mTJ385F6POnth5/m2z01/vzlZS3uzdNqONEUR0b/L1Om59a38s5Trbe/qQxCGEwotXWG3+ZaCqEHPR1F1EsqmAB3UybrFnhl9A/8X21QdNiV+NcS3poJf74HLQq7UUd9VN0xhyA1U4gsRLnBjQIzPg7N/v/OIqju0zMFpzJNlt6qk5KL/q+DqQafTsJjo/bF2MIy8NT7wzZC+EYeEl9ewl3r+Y7xvqIsUAfv4PRFA0Dhy6bmuZN0aJWb/G86/ikGxoBexjsaH4bGw3+MvSS1ZG7ZQWhryO9/y/FZZksVPNiyn9mMEYRgfqj6lKXqxt3XLbPo+fEd3nFA1NUwJxjfx6v27ExoJp7QFO78v7lazZuzWFUmrx0CmFL+ldMYN1GtMGvbkpK7p5AOLw3Gn9DnlG1IgIP/xH7z5a60LK1SGAGmDDWqEovQaR70uYTLpv/z1di0HVMBxLKBE9T93hTmgWtGaNzCbCg9Ffz49vmts6jN5JYfof+o49ZYIPgGcWihXUMJHY1JxUIJ/oOxSkgWhQn4E2uNwzdixj5ZT6CW7sAxWfbb0kg1uaIIvFZaa0wDxb0VG3xGiABcueUX6b8/t04oQInVzlrhM4spgo4goEuweI+sh37mZD9VmvE3116NVCoQJ6gojnx5Gj2FrY5FSD2uYkyfm+AAD+/eDKzgPI3SEOwRGoj8Kl2yX4V/uUIqDViGmNA8KX5AsJExn/8//8H+lz7bKbv+rn392N1raxKzlUY57PNRDWrc99hJWyo3boMidN3jq8oDKjgSEbpNrnnw9WT23kBhhfLvv9lzTMwT6vugX4P+q5j/WqP01yQSq9M2fBqSJ4nM+6EsYv4NzqGchzBNsWsK6GLb2cxk3uhPr/n2uOeqzdOBREqdvgnk+Hf3NSy/gMvHeZxhnQ8MjSj7o+mT2rFSBWUavClZ+oDnrA7+EH8ThsqdPxzBgiX1uOWLZyyi+Rdmf9x4CRvIlrMRJWcs21pnZWAbLBBVDlOLSzT2nUvsQgTONVnPEKZWoOhEYSQg8+j91BOEkCRrJ/EvejWImr3KDIfoYzDd8paffcyl1hZclx9vV0maeM5ShzeOZypY2WNqw+5YUM9wZJOAlBPVdnM5knZemBd8CkY2efYKCPkoMuQy0xX3gYhvnPLmJG7a3vcNH59W9Ko/abDXs+4Xp0W6SOtZ2NL3OMYteZJnDtQCOP1GsherR4wR/WlbjKJ1eAlk1FP1E31Fe9xg529vbaiaTTC513HzVdno0AGUqSbej5yJMCnKjFISci3gfncQWT7RLzQp0t9dldKQwnQw6VxlNyYByPkuWvhYWI3SuD6+RkNTVEERmjw2PafExf0rda0vVUS/noBLUCfmRd9iTgl/b3qIhpYzqtCxkZ0xYJIQuSJB4admTtJMaqvSdQNRRH5t3H7WTPw1JU9O2xc8YZYI06s79qvwdfjBVXqLFJBOIUuv8EH7Zmr8LOxFc64o3/4qpl/9/sMfI7dmUnFvzQOovKyz9+1NQj4oPMJTMfgnaye3MZlT6ANSVXDz9TG2j1onIezZTMdVKQWMsuPKA7Z7Y71nitD83xM6ozT4TF5Dk3yrjMoOvW4pdPHz9ae9RYu337nDRZl1xObCwvtxklcmeKFvwSxCSPnv60A3vebYqydnMM1/i/DvSLJqPZxZ5I30xSLPpL0rPp2bdme85dOuXkkvxN+GLzsmhWMHMQwSEet4Q4b+ptLWuI/SV3E0a2jR2OKzE58D5Lfhg1X+xCy5/ThHsVXZ23BfHu+/G50GGs4quuSzDJualHLkvvcUmw+vEd9qq1dxJTgQ91xcRzjXztxBPm/c8Ija1VnwwJYMcMlOrRH8u7T96WtrLL3M12Yonfm+CNHddpBO5gg7xPHtxhAYxIdloHnNoSZcFajL+qN6fQmljxr7NCvF9JHnuAbppbak6NBTr2cSvjyW8Lv9CRgO3XLUZgrotr83t4LlA+b+coHe64mVfhBg8HE4hTpTi3m6tTCf4k+DjE3+MN0b/DOg3XiMIizDkmujIIkW6EwAQdccGaij5PV/ITn8PaTdVfdysd82VuPmBfxS2j3VZwiummhFniZl6Yz8LnEMiTJ6fSdG/epRDTAU1wMjMMVWFXQ/I7/HC601a6EN6FK6a1pyLSa4i5HM2ALZiXVUCyymWtwHMFRVh1YkbEL7vYxtMp6xndWX+lg6ZhFXUCJ3zR5viqcGAIZQGTAAfC9ED3pQOKyTIIPn31+jOZbeFU7/IjTNpUV5+EWId3Z9Cb/42i0tMCjoia6cJqc/NJL8/kUjWHiB+bcdrtDRnkMKOyTvfRkX7SM+67PnQHyOPlVRNVsUkb+q0LGdtTm85i9cTxfRHoQZzzoujzV4rR4+VQq53ft68mwydZRRsclyj/tkGhtistscyllZYhGpUu5iHFCrtE77QXYHIaYmDHZgdABpVVgqBnKz2ljc18vykkxMpr/+e2rkQ8Tva772JO6VAErfch85kaCzRalQnbexhT1Yx4WY+GnOlOWqMRq1ElPA6uwIErdzXtExncODlQzLNdhluRuL6FDzyCTI3cdynh7QT6VRhn/5V+Y5TDWJnI1Gj2eHnOpTCUvPZzqh8AeI8j0XPggXvK7xTKoG29vVVS3IrvvOGc/iGqhEHg3MYo/TZ5FRRn5eFSR1nfb8Et8vNZ/aMb+yvmKYpIH+Db9DA1+C5qdWqslAoTw24+HL5RoTJz7UvQZGSZxAz11xK/VCQ/hFx60AWqJHgcka017JcsK+DWjSdZrXT0tcoohKmETLbuOpLFOVkybAtHG2ADWEA3pMURTxFjXc94FOUYzXSvqjEg4xBzPte1Kq1iNYt1l14QEN6JIFPRe6tf20i2UhmaMi4jxAMDP4GBDtrEdO8DOn7Xj/RNyY8zakIwCF2RdYEn+oqN8cHValqbCHtGbxm2aGQxqNE3YSgqwFALoyrEnqZA/2WVzDm9m/0NGNjOYE7jwQuR+N53KGyQJJNANIYr1AhzKBuJni9oBpNIxICxKcM/WPCbDsxyA0OmR6+RIgLsM/19bKzKoFNJm/aazBNqP3NNZQaInZPSK56SlF2H9wWhl00OF/10Fae3VVyvaEjE9MQxO32SWAmDY+7Mgdk0EgldaBlduel8UvxahiOIDvN/Ct1pKYCwM7vI7nfik+Zi+h8G7rnCcABgjxKbRWm0g00yYPW1+/EaqmFGowPvxkm5yjfpRGNbQkdewFGWe8HE1MiGl5PAColMQVp3ylybaE7i+q+IIsYlqRFIAX+SZmapDtbd6gLC5z9YQYZKQKBQ7MCBEX6bcMm2ObB5Vp+tVEyYp+S109wH6PKaGjG5fB96PX58aacNtGnhlKxxIZVPSqMm7i2pw7b3Ae8c9WrJAe2jHuGEM4qLO2ltXk/38zmChfzb5MSH5aHFUOwPrPxNLlRQzph9riQ5bZ00JC8Y/Y9OybBrBoHif94wPUFKcIBzWRUMH2ewwNJ1109bJbXBu4sITCLrh+y0siY0zK0BLnRPPQQeuczcHyksvua9lqVJH4Tg6E56khnTud+WWbxbw9KRmlavsWBXQ3w/Vitj0M+cdDZPwGM7FnYbvp4LsCmUJ63GB1Wgb5Npm+3ObbMo5S50Gr1r85VjckDj5w3PE7i+XXylfyY8oQhtg4YoJeI+5ObOyhi3MFN3oSHFjmf5lBMYShMTfnmwZSphXh9ymkJvo8DCd0hauU+Quaf9c9JNiebPDR+vWrsDFUKw5a+PAlIwn3Gotzmkc90Ogvj7CMo8g2Zeqk4ldr/zURNAWaxRuRyBZpTaVakXQ0qswOZnV2ZayaxKZ26AOoIEJvvnyAKvCrHzxN4QVNRtucZQ6cwK82T5WLTbLS/MjHLjU+c0LmHEQk/I4E5D9vRj55XWBPlipreF67G5pfUezSeP1wxErpVSp1kLlkHe6QwE1nGTElEeB4BBSuiQGzwyod/RdoHvyO2B4cD3zJv5NCHrzrWiSe0uMb1kb2JAMmiZdXMA2K3spCl0kNVEAtuypaIteYkGFui7RolIKQ2uxxsKSzsunCyVr3v0iLkhhRuSpPzc4/yMrFOp4RV6+e1k8OEl/U0XfWFGZW45pxcA8IhBCP0td/kowt103aVVwkY5FVcGzhaX2WX3xaNjp6lJA9eC7NCWpNgE5d7ata8TgEYQkl5+ee5kUJ5/FOz9uxInsX72zQfgli4f0iqmz4d6vI6eLhDSCI2TpCYcdhy+T+5c+ZdpDu4A10SfAxrYqTYGbgrdLsBA/fL1nBUpp6LZEOWCw5vG361Auo5m0s9qCU/yZCH+8E5SHdGE/dwO9gAsRIuIDIQ9Mgt1bhprrBMoQtCnDsCBjiNO5SXA7GnK/Nbhu+lQt10j4OYvmvUuCIBsCiR3QLXl1qcnCUiwE2XaDFJZeCEzrjllsV1vvuDpMhuGEEcVLaWqc77ONvH+rRWg46LP7AV/sEnVtqNgVJs4i1qBM84FbMxHc3j26gTPJqgLmnPH/H8hqJnra4akgLDrVQ31BNVmWalNPBKBKpf2E6aFr0JxgQihdvTT26WqhfiZuzJRvDpkjRDj0rN2R+oCitk5B39cr9ygCLCyC9N7BCeB1b5moDcDVOIB/gvbeamqNywB26M9yfWsdx7v5qfU7qQl5GnEvzyjYa37F4davtkyMyFI1xLGG0y3bQRe+DJQZZT5x98EnunWwGamlYGp64YDObqHgzSxt8ckhNK3bnBdFh39UbphZ4hsbQCd87tvDJLsLnnkx5ZX+RANSS6URL6oLw7rJSjYpOfJEJ/5HxacHhfmmCouUp0WkFHTd3WvTaR9nE9cOhxGtQ1vzQmmJQ3aIVptZhEIyUUq3hThco8SLBj+fm0CP4mDVEd2bSOcoUTsC1eKyx0/hMeiIh7aDP2TZwO5QNeVb/Kso8WooIbAINaxIq29j6zfGEW5UeiEezruGg482dPafBk2ZhsIWkFwfNkpGxYSjGd9NkZXmA94Z3G02Wmb6Gk8rpeiQ80GUUcW03ZYrkahlJXBoRt58mY1mJVhErKugEyA2x6F9qCiC23EevCzLIbGkNMa+py59oZ08MMp+8xuts3b6GqGJmpHgr5td90CVnmrKBI0p9ZzNkQOTdEOCFIxO3PIoflUxb2+bc2kRn8Hqx0v1PIh2H74tZQv0BABS/0O4vHBQ1JTnwHV8fVUhbYNYyH5pQNne7CS1TpwWjcMLX5HxV+InISwPNQ2B6B4RGznWr7QGRZGI0UrJsp8lIOoLQp3bxl+UklSCUl5I05TS81wxIffLvCxYhJlKBx2cw1TIlnIgreazGJzAgu8i6RivLyp7DEqQunaTHFE8y7JTSvNAkOLp6MdAxeN4IPM/QzS8ly7tSMSJRP3yXYKnnTvkyVp0wgwu+Ej788qCHXZAbyjIi82Pu/jmQcrT0e1Xp/tzERVwWpmX83vMJTipf/9iBb3FWlJC2Tmtqs4SYGtx97paBdafpmEn96iuTQVdyWx07R0Sp/7ffcn3kQDkCmIg0EsAj4qKmnSRaCintAE+Fjuovd9g7+eTzh8TfIrWqoA+NREq1U/aBUIK78U3PiqvbVgRhMA34mEI4nZjw5BK4qjXiGN+DxiYJQElsRnBpj5IU/A5UzFgBw2/3FZiyyK8Xw5kMsPwHqawyvO52CjzasO6FUVP0JufCp2lfscRts4+FD0NZmlFdApEYk1/3ZnOphlKfck6z5BVXr7uKY28hecHGNk3A5XFEDVwq3/CbG7xwB4MbDPUyo9UvFOQqOflO/H2iDLCizE3Xcv6Y8hSrT3A7H69LNao207fF5wF2sx8aC4svmqZQWob6X5VunvA2uwJFsg+VKxbe9u9bEva/wBbvNyoM2N/K9HT4cLfxu+JmE5y95WEpi247x5WVShbEWJzejaBU4j3Z89xW9aorJswsCIwqcz4+Xec3+/rUdWZk/Fxir3O+lMFCGKuxikfFtxUZaGunjO+Ok55upVxGSdVx7etl7/X/K2QvBE5Pu07F/ZBIlbei67wfbqrt+5USbl8qt4mdEmvlgROxj1kRmCVHvQcLQyCwNJeLz/y33KmjdAq92GOqSCnxdeNTZ2QkuZHbNYX8CJnZ3y8axJWPjt5aKU8U86uIv+BR63vHdqKZ8m9ssw+QuNXcg4/+nZ8Sx2cwpctBbv4wfPePxP+Wbhwsx16+HMa/2ZaYxyoVvj/T8sLckkV68FqLW7e/pCQ2HzDWhZHYUh9XCNpaF9FUOEoHQVEpBZiRBl8Jronyl7fkrd1g+vYNHSFE5dZ/Ma+MPUjNaMDxozT+0ESW01+hNJLwzEoSlJbWs6HMhhh50O2OdKydDZ6qOvBoQTDRa4voWUBi/ytScU9/v3rDCvecia2+C4pSafRtNwaKXRuPnm2ereoyrXrZq+uY7Neau/f5Edsew92rksl24vyyDzGUFgqjJbIGf5ePEbLChOPSbuaNxlMG1drDk+VuRLuUOWcgLXnKrl6BXqFSjC8ejIb5Cns2XZFyDnsa5y/kdCIjyuJL1F3iiBXGNY0339EoblnzBWRN64l+8OidAQbxWwoFcku1xz8L5RuJ7CHdZQZrPFUaXuahj0pwrQMKklAy08Szljf0V1OiUITUQEZKLu2/0DraUz7jp/nUZt6/HV5ceT9/bPlOlAk1WC46cATEQofj2wnkffMeZcKUlpVFNXVaQ93JBipMZpgOblOYVWqfP7WsygJT9RQ9HbVwyGqEiLxU5rijZ9nRXi94NA/BrEd+ZColbBn3dPM/pobGeumIpOm00Ql5o9m+JgBvWapXq8cZTUXArYD8+z7pOG+G9nsHUDUIk6Sq7uXKeulg2U1nAt7bK1L0GyU3Pd+mBtv6zgnrwPzjcI6k6jYzSkzOOXKqTHbExKAHA5ggzSsDDwmJANvQXyEI3hRkWPhCZwllvrVwiNW2E4FsDAS8oHiD7yuYtei6oOK26eKFVKJXy4blkax+Er0jamTE6hiCTN+0vggHvlkI3mWZM9kAnk/vJbCI89zjgwRjmeIyCf8iMKmyK3G4mmAeqIoytfuMrmCIiurAHqax+zMbGEtE76WbJQkPZoohMRdLGTDVRrTnzTFI9f3BEodRcZZTgImyuhZtg4/xYlVWuBY7gEklSJyGYKaXTmBAP3wqqhf/5Ml/O2b621o2mirUNmQjtxYb+dVxrM+oybw6VBI2ILR2PEvtzJDuVb7tqVvkDozl1zckawYkxxu2J7e2hWhTwKKrDUAnvG216DJ9PV3UoprJLuoW/gjub7cIjpK17zCGRxALTIfFaA1Wn+t4NdUxFyd0lNUBnMy4Wlrhj5yEqcpg453T1m0m8/lg6bfxdr2YjWdBIkVMu/9MhxNBLSxggpfzNMnI+K57IhtZLAm5NV6gMWajR6HnynqhpbEHw6xvKy0hS2jD8Iv+ggOBVVWXzqN1U5jjEFfxDAuzB+f4yVjLNKvxrzsx5cZXjAebHzaQk3oBtlufX8JXrE2TBsSE+t13aMSMyIPxm4/US9DlRKILsFPc0pU13M8U3qOjmQ2J4Ujsol/lBQT4oYvtLKboL2N5oBwkkBtV4j3Aq0l80UjHEEw7Q86PihTfHueMM9qe9vI0MHCxp4zgvALyrtTBZ9w6rD3giEzLLaeNN04EBBUGQUcV70fwm9gebE3NPL1okoRMkvia8AYLvZ25OGLLIfv6wBw+iDIgxO5WzGgtDwFeN8saDLIz0cUGtEMWna2tU/3lBEuOFaG1UnedV1Eb70HL1w4AEnsc3DAi1M92rSZGrAdbPhz7z4a+BWh9Kfw5rth4JkDfzoV3pefUUeXNikbc8x7SAfVarG/FORVs8wOGl6ryIORZZdojwajdEWdXqVTHfP6sqP1SvGmTwQbSGI//AyQB1bi5qjTkijVKUJgePJzi4okTgbY5+7f3MswBf5wY8q+Qz6goOFws6ugAy81ho8KhUqxtFLQIYXX8Vnr3qP+Ghv5fWl+JQoYAGg3PHV6eKk2TI2QeJhiDk16uA4Wo6plYG4WEhqG/ebOHvwI7/cfDvlUSSrjr278G3/dnJy6n48d4gCvO5h1AibBPvugNM4kQJTkT3RqoktoXirB5/vL7h5v8R2psvgtStBrT00inSA1Wyon4d9dJx9uKIzRV/lRM9kHON8hmFRxazInfhplTnatQ4QXv4D5Jx4IOJsTLyBrUn6d6jR+tiWjj1xt82UKUPME84gK3mbtaK1vooAYhLr2t/B5FenGVe0padjUL2TQFdmpsoQwJjO3itzp4QB2n92E4GvkaTiPluBriIQv6bv7MF4irqpy/7lmAUDhiNJjafyVpVX+KDg2bxDlAgUQuWh4R33naQd8sR1zFVXeyN/IVyjt1izp2qgFPxvKRmnFjK8gQdo1eNQVhhufyfZVxjFzmL1A+qTeGGkPMMdce51CabGrC32vRyfUYbnBNq5rdeg0WfMBGGpWtoS65F3nmJEIcZUzZVI5oMfsnscATG9qiV/4viPd8rLVMXT7NHSd61EFeqfEvp7lVDymuySZ7fTjOQbQP/75xiA1317NT7Obn5SLOH8pT+VB0Xuw9IZ9/+UzP/EWNIu7d+FlXXMH76bL/9wEMKDSJvQlHq6ZddpOhHCOOxAyW/jus533zDz67s53uonypRCxxhkAfLDCHIS98hqzsMobAgxILdsweAUvvfayLrbTX45r/1eUilxZNVbHbBeN6/o5r/1TgunXNEX9tl+hkSB2g0Un5M7NLy7UMWOr0kITv791GEvgl2vSAsErwY22yq5m9a+kGEFvy45YHfSgffocJbNBZRTvSgST2k3W8T1+h89FPYUy+ykYDXTaNQSsJcTEZHJppxQyKKQ3opsD9ZIIapaHaJKnNKunkwvpljVMeDZdH0U3qqIp1fiJz0a+2YjF6z92bt0+m98+JdkfBrVRR2xd/RcCA7d2+8z3newVsRPuV4dupfS6KkEdEeQ/3wMYYpNY8zG3DdD4E10bPSi6pEvWfIim4ZIMHwIHP6wfdk5CEMp97qrUFxAQ17h6zE54Ff9ogkQd4rUyeQVUoRzEwRCNUp94ipRDJzBbx9YEzEuzJ/919KJo6HcJSnMFemjIVhnZmgIOuA2EfnkLl5SGEITylbyKdtwaGHHGa2rV+XlIW054lM7vbcU4ncv3FUUQtWu3wEt/5rrt/wiXmbNAwetVWf/wn7bgrp55E7aJecl6u0Tpcrxe5APrxoe9aUx81wKa+TzSsTz5e0oFZhwjISUiRHmwYGhdOfWFXlchfKKlPSEb2zNaJBtNeTO1Ry7/juziHZrB2kmF151vcZtaMkEyfmkiowg5D20h96AGbEMFHapMlLgwE4Ez7GOCiErBG39rSLWHDlR0pj8CEivi9fw8/cRI9BCuWPV7QZXPWRtO+YFytu8dIDSRUEjFaxxvbcSW0gTnKPxmTkbIY1U8ACF79Kf+rxlSMeolLAIQ2Wc7JnOQYzP/zGxzsuZI5fmbeYr2SuqEXp5rc9K5zYlW1DtreZFA7WRfGyuGwfi2uH/pGsdNdzgaXyQRNtfw3n5yuQtNkrW3oXzK353b40R8HUSc7hdWPST+RjFogSDLMUkBjCTBpqGfWQPrDvWReLnhk07Le82ryX6fSBYALdSPweM2XhdTcrSo2hSgcSJ7MRXUN5vq0Ve0bkst2cm5ddZfSCOSHJRbRLBugxj9mnNiZw16qtUHwVoLpkf4CWBhOhE6VL2tGxJlVanBM5cd3tVuLQANBRWuNo8ifyx0RJg/N6v+T9raaJnh+FfVU2LZsbX8w2EC3HbD50nYUnuZ6L+zJYiN7CpzJMOhOD3+YTMdyPqkARopvhVB7sRAF28a8R2QZrS+acJL8kEDUkZIsQXcWK4tUqHmtHlXQqZxiPNS65Lvk1ze2UO4QHWGCOd3F7+5M96bv9+m66oVFbX0V/1dZDz/nl7p0apU6VwswLwa16wJYTjady66e1vY8AuxkpP3R16pCkvG4G0YCzMfm+z4rTIIwuu8TKoPVXjuaDFf4Hk5yRuuujEvXcGlOkid2/PUZFDD/mucdyYj06yETjyGTjyvc76aDZvbhgYrEN0U5u3h7QO/PcEySw6jkqgARb68Un2eRLSddud+B2l2R3qileZeKLf2dx23Hd6BqWx1YcPoW8kLqsTawnFuVD/9OhxAUOglkk4NFOg6mTH2+9E/R5mnvqQaAgg76s/h5rNXYn6POoNDuzSVBqkaZXukcmsa4LU8vDZgtrTDcCy1rsXxWy9/+NjH8LYwXEEXiDCmo6QZ5Qra4HMDeyTgpHahcSiL7uLSwrcUFlLmBXbbj7M18PS+N7kaLkyjE41wTRpXpsqafqCYnIq6qzjM6o5SReLQE8I8YaDRyGMJBie9I2FZjJ3KMHhw5dNSCq8W5mEGBjS5lb79weq9aHI9M+8vbYjrPNNDvgwzPPys8e0LWB+/dc3huVrjs3adQe8793ojeLWPeSI2Lw0EqIy5oK9w9VsQOqd8aBnv8i/VMG0UFygEZx4vtSldSRctn80TtUYBHBOJ0OoABa82mdp1hPwV4231zr6qemRVVyf9vrOrwBPzw+feuP7YVZ1LUKs8Gducu89jA8pLTHkCBZBFHXCIEgNGuO2A8vXapNAq3/eLjgSIBIA+Ua0CYifEeo7fYXbEkVor2CbbTGLSa5JFYExjC/6975Bl0+y8FSV6iU/U4D49aR4V2PhOmXqRCAITyvitmAaCndCuC20930hvk5sM1KD6i2u7tYc3UMSN6Y1/vI9gLxnx69HCshSh5G5PA5GFn8F5l5/gcJaBUlm2vSo6yfRXCFrx7wYXae7mvyXDKuzSQgYyGYkqAeXj2aFQ8vpoV75X9792+NV3Ou/ZabC7N4dM1T4WZaUENee9HlL4qIPTyg380WHY/7h9foUw5CkHq2AWcRwitezGeqRGTNGc7zBCZ6m1TMYACkUpyOrV3mdiquD0w1PlGgHWIi8jl0ojZyhod9G/dYbrYd0eak0x0VGXGCFSxHTagDiqEgn0egso5fmGhjWV54eofY3AzVio4zaNoyvzvUzJth/3Yx14MfRhGi7H9PcaWBWNfM+ieLAM7WqQUEomtWOAYxyI7a7kTzaVBlgp7/bppPoPwOJfYBp6fsvXRY8NRojkKaxkNQbsm4M1f2CLpVKhU4Ghp4t/sc17rTVgOwb6rIml+TkCuMwpFDVbzRNGCsk2Q+xeju3pQAqIvCD8j9F/fLzPsXbZMt61hhV/oBMe4/EM/M5eVGfV2VHP1yLiiE4zaGJ0KxruW4BJv/M4sp6rsLI69pT/tqwRdLZtB4FbMXyGM+EzeJ6AwsjeTx490AKwDHeYLRC210UTE1BFIDL5voyjZGMk9UE021naRkba8/5Fo0cCSjJ9T06UYIyKxjotOiLFE0hAoYufqvVhYbpFHF5eqSseYHV9wDokel8eZWO4WucI+HXK1HxSBs9fbkbEuPmRynH+cNrqG7JOP7PEsVprK+XnrmYpzfIKFrshgrkO1NB5uND0Z9/mNrxm2Nj387aQbnLcnb4Vz7HOQxS4CaUiUj7lu6EELoGJ7xIytaKT+0BDrWkhRz8+6grolXbh2vRcfMGppKA15QP8t2lwCACFHDR5UAiE814uVZ5fXWTmXHaoWDAkOArYIJuMUqAQnn8Zteb9H8yQH+DnDQJXZZVzvLDV6TBCfkQ2d8s0cTAqJq7kMZ9Hk71sejC5CCl/RWIU7v3TTELlsoFIdxGkVCSWpNqckFToYFKPNur/9HvVJiNc5mUjygOSM6iJ7ZF7knSOTK+BKQFEwu1z6sJJ7vGwBgmS2JYp3gAosTTzc3gjDLvbt9lnXUv7QU+hj6OWxNvS7UWfE4ouwNjn8y+S6PzrLEPHxY6C3egbI/TItFeC0inpw9Cxg1FJ+tjaSM7avLKo24D62NNhKhKeQixAxZ0c7pOSSL5YYKUADHFKJEwD547px+1Htex+6d6V71tmO0n7v4hEUODTenEjeIqcotFyq46B551/v+6BWcblxHI0O7NOUsPpSQf19QaJ0kE3c8QfY/K2Mhjx3cLn2iJJ5lDxMcO/z7Y1HvI8rtOpg9Gbkv5EMd8ZD9ZkZ+g6xmbx4vnzDI+JXj4wN52tXDqeDduF03XbakpRiUjjjXWpkjxyA1iU4VVSWZSS05fihOajZMMoWGXutRLHQa3EN9YMVJgppbmAz+r5VXjxuK+Kz+TrhFEw+efuu6jSBdub53uro5J++DSoGFeFCp4iR3+NBKxSrb2hmNwF7HXwIt7+tX0kGbp431Vr3A9n1sFQ5a12tZxi/gNJPsR3ovxyMR4tsf4+B/LTCS5ojip1lmOBO3rIL3D/42WUyTmAjE6N4aJ3Dt63VpWxr5IPegXu1350jhsDav64QRkCJs2+nxMhYGy6cFhhs1vR9OgyyDwLTWAPytJIS94GNXvmN71c6x6hI2RY54kIR/LjeRx+wFY+0iwQO4stRyAP15OENdmcJJ9u5ircRcwd/EegYDY1eMXEhljo0jNuZbg8SwgjcyhHZNEEImYF1wr0ejcf7oukMlzxb+BSB8zkcs/pBUzbwZqe9zUG+7apMbH5RtcOYQH3Tkxtk8F1D+tH0ATqqeip28XP0FW2KRBlFyK9Nie711gr4j/NpL2MRpMUNhymfUQsfhIlJ9oFvFt/cDk5op0vnewaXalUOBdVmUBDifJs0AdzZnQxLiHIqJ+6iHwuZwF0N83Nv356ZL2qprm97N7Ut8YzCz1zADD4HGc3JW6q3/r6cLM7KHxA3b53HzMQCh8DjyWKinMQZW0cDVO+jSRYx/MYzKzmDC6EedAg+ot3TvfT3XwWHGqzyxzxJ5KzN2O7JMAshz3gBoZl3XbMY5EeSjU2/iLvu7JeHzWYeZNOrDGxANjxMAGD0nuAn9GMGwRM1+iyZ4OX75BrQlyc+5lC9//mmb6H6KE4/pKvxJVjibTWEfV81u9fvVhGpF0KOVdN0ro8Qnuji1yxgwhbEIO2z837nX3OMPPnJgv96RX+r+Bmy985WQ2l3J2Rl5Csvf5qCScH044I/IJosVKMm3qYsMx8IEpCaoSMP+wNXmToZzO/j2iIVCB1QVUR8Cy2Ya8ielYnkwhCm79UDNLc7wRQoIFp2LYacze4a7S0NVIwQ+D7PuUel5QV1VOqRGQaGtCErxOZjbU4rgRyw/lhdsvWRDyO4XJD76XAAGZS/KuSFvJHiGHT7xc/Vw1bUSqvaFVF5esEhhYk+3j9LLxGOgr94v1XTZEasQTIC56IKfuutuXTqg71d+PsNmC5rfLpdPWQOhvs8E500l+OPk5nxPAzBu0ZgGSNKDbMYwv7VRsEd1D5Q52oMkJrrMWVhhIWVe3ALMf37gT/qI5iCXuqiq61HNVOWNhUShhfnG1Tr9Iui1LkZ9c0hLHhvFucCJ6J4ww1OpaeMZ/rpZ69CYTf2ovVvLqJs2ffJAiUGrRsZsUzZjyJznJswmRsPeyHmNC08Ds+3nVEHYzf6tUFCzwiUvvo5WeAZ1xEnqKsJ9l3ZrPvsIk5o3c/WehWEXIOoq+KgJa/eyLEPhlXw0SYKvkf5aiZg0GzmPObabwqTRVaviM8PeOk1t1gLGIIZgAURHR24I0gOHp7vX5kLAr/7oMQenDJS8C8RcuepNHAg/acqEbzprDa8IxRboD8s/OsDX+lz+0doUDnRp1HuvqzJ4Z5yQrjIKRk/X61bkKCpfdkv72ewtFZxjovfVz1nZzW/nkAmZBRaf5ofGn1kFE6GmL/1tXzjcCUFqd8Htqh1rfxRorMOJlLncaZwTRO7K/bVRT+/ZeTSKV8PRsYVEiAacMj52qmjXx0/DqFbnGj9hnJJ0ywoMUi5Dn60WHsuamWflg9FxY7SmOCKBMKTnflpkNH4OAo9xhZmBvXPAsaSkZcK3VwWBJCpWZ5CebX+eyYpHzQkJ3tq1Lm9/DQ7j0J9HOP4It25ZGsmzoAoFgmDAW8xLyLColzEEYedno57ZZWshTNufadhaINcX5IsJAhuZ9Q146h/7o9/maOaWypDJXx5fBuvxx62hOdtd2NYDfXTbGHEvcWH8pt3mZgrMjZ5/Wf7BuUC55aGEVGSBTV3OgrmUBxCHcn5VDPXO+VMXBROTWyBRRIkQv/1AubIfVW2cx8eoMuuPi/zAGbvlynt5DCe4puLe/OQoaNmzG3VAALv3/BNUAriibz1QJrOKnLy1uyay3a0k8/uK74dSYk/PcihorVlZoCddpKTvZEuZtn1b1yFA1J1VEGY71qtSFmvY8FA5K46YOpfjRQsgcldxBYDMBTy7MGkXZssrelzU3NP5d+TmgHQXxdPYbSq8qZEvNsMTfmwvAp4RJ1wKY3aUW0lZym4FnIPYYqws+tSvrg8eSqv4JHj1Off+cqT4CIH3qf8LCZCrkYDsW/lz9/7PBzeEelFWFc4X4IqURx2alIjJ/KL5g3UlQjxU2fFU6CVwV+q1561u9LiiXQ2MhP2w3TdgFrtSu9Wgqq1mVZl/L3Jiv8O9zOTBD2Zj0vklemkuUef0dGYTjuWT6dFLXX89OBK6/jS6HdX58i+Jq4oSvnjW+NOoe9Cf6D+NIypdkr5+9hc0trnepMpBSi/Meb4SLNRSuziI00u2WbVISu7DpHVUU+G37Yn8EGHJlBeXhy2jZ0xNVrTlHFHkptedY2ky2AvCdbDSJn+y5pJNtHBrkin6yqcA5ZsZk8O722UKvs77GQOjLTJWJi65im9G/JK5eAoGV9yRh95LF+XtgNBkj7/Jw+xWhMut3BHqYk1Go5TxLiIGch1+CqaBKWj1xcMBp/sLdRxXC4aUMrLzq4+60Vm97v4DtWN5oPicGp76Ie7PPB6DgJAWnGmkXPSaTm2/e73xXtMW1C82cJGAsUz+F0q8pSYHYEDQue0asvyJDfaWRnQfNLzeuZsw22sSWxuLh9LzXNM77/oCoVTXzFbu/P1JtdgDcfjUeozoJElojFjZ+EaPwXXFl9LAkvLLaGs/Wuy2Jph3KBmITLaKb1q522wfe4ZJdc3Arg1Kn740VokiN5ZWW6mRM5x8qBP0gD0OXAWfvTYzQV8oPD+y1gfrXwKbdv5xo3qrFscT04tkN9UkImTxnNZZ0l7JdeOxyz5jG6ep60GtvfYxWBkvTIRn7DGtYlj8KgN3jEr0TzkgXiOmDM9YprwOTXMqfmKnFaciHfmI+C8W/5t7gIRUr+zrOJsYf9u0NvrXytcwIqT6xgIBg0CtU/sNT5ttJFZMXwo/XLUg82pcUhVhCGH5p9rGBR+WydctW6kHuBwscYxJphx/TUyXHo7Xwy6N3gOUXFCU3TekJPhUeT7cNJEwHbGnd39L+IQpBgbrFQNUY45INFcuFSElzdjqSorLIRHTnLaMWM6ryI5ujLvKMpUKa6baQHSLVcbeBD2ufBKAMiFhyJLjYttQoxkTsbB4akEuKisj59cCaoiJwH4c3aM9ioSO6XBKmL9ikX1U6m5Hu2fYh5d/nBTdbt4KuG3Lrd3nx9rnx1Z7LwKhP4F93Z0itCUtawwUGwH93bcIcp2+L+iuDBjIuoFUCgWV3UkxOy0BHgDFdLyAjN1y1w88XbVKuLCUHufpQJrmy0k6cDyxeowzx3cTmGxMtQaTrSq6gpwXXLOB5cA9u5lO1Afww5YNgGyEVESlrXUKPuWtGbz+8nBznrHQiki3U9WOcPx8JFVh7tLWJIrpFjfHu9k8amQtqhpXZgv/hUJRSeGkm5WJzszsIXyjevi3qPqpNPaLEbxxhpcC34lLDUx+PB8HMb+gdWNSykFAndCS8BxdT+z7GmYKiuqppk4C89mBgtEIG2eXLLXiXD2N+5B7p7fruXsIeo69SDsHT6lRr2MVPIhRONLud5GKPt+Bs1ilJHTtQFd8PD5qgqz1oQEoEvKcSt+9g8QUY59he9hk85pjLcGbjJp//R6iqAeN6gzAtQ53iobTHT0mDZaIkfcJnknyjqJpK8rxg+ctnHXU7PqSe4fQhq6Wb8wGpYnbkJM+7yOOwvkHv+erHeQls9/eyqEFGy/djyvzZVCG/7s2mzql3/7dc8Ljv/uZiFAKvZw02LPU2V3KzekORgzToOBbAyNnVZgqJj4CYayIvsoUYw+clAcAj4f9MiAojii+1SC5jAP4f+ufJdOULBeoul/EvBBSLeyeLkgkLq0FmbvyKUP4G2Fdi/zE18Xx4A4y3ze95xGu0pnBnzXFFjbM7dEnrTwlQyjRjrgPFFluiFMOeqaFVxZbm556YpKU+zxvVnAGeXc5twZuMgZp2zGgP6Yldh8tOzoswwze8jfW0jqSdD5SFWl7U6J/SXzZVjNWD2PifEajp29wePZACqLPo3Wx9s5WekwdyQ7NLZpl+U4UH4apJp8gJxkzM1AIyPLj2TvOJWSxa2cDoHCwdGiT/6ShB4KX2j8E8gcb41ugl4Uwm8086wB6dkbDUHS1RhY4Ub2HIUAlfADQyUE5LHBT56PHpE16uGOTzax0U5n9cE3O+OcGYPW5rm5paHeoW8/lssDwdVjOMPBuBXJZ0X1TmQPbY5y3I6yc2bG7qEPBpP3Zxz+jcyuDDYca2nbwfjSLRborAHXnkvzYnp/FSTDgFwYOOZMjdGuDILke3l60vHQOXg9xJilAtSYh6nIzm6iK87khl01AgBBwY7WjfRpXgGLfLM29InmJFeEu+5OfKemaefqq2wXKea1NEZwT2CFFYr5vmxWxekMpegB6gdgg+OAMw7YlytLc2EzWsoeGlT+Rxee6EwzYO2+oBtfsiC1rk3IYQW17KUmDFe29O7LTWFn665jyT09JY4PYbPNTz16wVTvX60hu2mMZiwNZ/ez9ZOYw9om7x2BsAhjH0vqVcMjGUsJ1MZD1caf4T9nMcDPF8ElIr2eujvZaeOXCOkSbt7mGNR7dA7ZjSldhG5R/tAjRW8Sq3ojqltRx4ijWgS+9zxx81FKBIJv8pcB4ST3tBHe/744D/T1nGpokbN+G4TnhVHO6941zCqTS9lKszGv5b/zItuGnmB9OLPmWJ5cAqLWRU00NvJ8rwD0rWLef+dciMOuOM2Tz6HcyY7/UQX8fPkdQet+w+FHxFxMKdSwEsuJez7eGPCCaLiYW1xrFC82ZX3xu+vGZ1Dhkpj89O2rmsGBvb0DfCUP7LZBPYGfLkzSvW36c1fD09i8bxFgNHMjrUTSRRW+CPR4xR+DLGbZr5J/VMGuTRDv/Kb8R2ZZNQnkxO5MvmaqcSp/yjr0ODUydi93DOhEJWb69w5KqSVOp9y3KBsASyyn3GylJvVM3Nfb2df2QmCMDn3PVdCQA+dv3nrNwGwH0MzWK0fRNOB2y9pCmYd0ocHztigA2fWyzwYlouuBTyPTspDGrdcTJ0jucG17dI9r5R59SEj/oH3R3UTofpqPlwH8UtA4faQJGz4p4fuYtc1c5NdUj+W6fJyRKC8Xdryte6wDxIG3jCejG0yJPxmBmh55iar4ceDhLkpVyxl0XTCZ9Tk1vm3iIBLZtDqRLqzRr6DSQR9iK7GosDrrZM7p7DQpqW9HUiq78yoIDJOt2zx2f/gp8UJnH2ykBnsyOpiscFck1Vp3JBiwCPsHVoda1ZBYcbGbDUgIq+bGkEJ30XxA+SfF81q/sNhrDnexKy+kQEaDbbIEtkZIhpbjmZpxkLXMZH/88bkVE6o6eBKNQQSZVVhk3pFX2sBM/W5gNFq9c9C3XXVwpyUtM5D4ZM9d/JsiufICbpyA7ZPXxvL3fgcBgQC72MMM71apbzEvNnJLGWd7YaBIy0tzbH6e3dRnnAli6Imk5GTTxlgkP9TOd/fFYJ+2gFJmB7W5UxKFuxnwUmSe0DU0Xtej+L3oGSdMYG6NqBGIAvDRSP1h+ZvcZ5a69f9OXm49OlqRMgEI420K4ho8cqLCuX0a8zfvmadj9Q11LY26iddYwZoloZcvUPlaYRdlCb7wweJhu/UyZTAaOI3qsonGNkvn6OWbEbx8Lm/pdiXYASEeW1UKGdohd7QeY+MNaCsxy0FR4yUYH2fOB7wEvTLQU1UW0/3Fu8tYmMYlF2J04vQGYzDvXy3LWjJXhqcrM4Xuh3QFGIpFaRkd9Q2Hs4DyGBZwLs7Rm5wwKDtLUNHkCQRJRvl5bJfUjvov5D5xS0+2YO0Mjc2wxaVe7KVV/y5CbiaXx0VPlFAcmBk2nLitR1LhDcreNa7UMV0fWY2dKq+phfWCC5P8JJTD/IOxZLixfzk61NB2kbOiDzM10HqzRKBFhEYsYYBENKX4x1xf9yiMz0N6v9CymxdsGBdssxevheXF1ClIzG/4A762jVxf5P9Cr5U3LWPoK2w62vL0vW8+T/amTEt/+mW3GYSRNrMsNRpUJDzijf6Qoy16qptp46XLe+/1wqvx1ILSmQaqCuLybJo6BIHfDew7EeGO6zF4+RJ1ZgtFBCSrJKUdJh/CqIWEOUQUGRP1V8pPExXF7eY7bRPuPAP/AvFMl9RPAVe5Pu3YzOMBdMAWCTq/Eqc8OcCm+Rz9KyUyXt9Hqi5knuM4ttza46ZTDi1AHSz1ZGCn3DkN6u711V17usd/6lWct/NbF0jOqzs4jFeCaJUPDFbrtO4qSSfJkP9YobOcKUNv0u7oEJG1hXb0sXZ6G/R1Ts7S8GttidGJ5fpzRT6b/7LZT4VRs0+koQVqUcFEhu4nX7LZvj6htXsz9xKRYxP1h6kUxukxidAwsOACxBjqPIzS7WZwD9E1xi1tfTegNaqo7wjWdH6DXN8L4CsPrENA4zsTXqvfw/d+ycXO9bXx3zj/ZLdyZlRC7LeJn5T44JR/LmZXg0mLOleaa5UrldgT+XdJKwO7DsHhTU2x42qvr1lZVcGZkR7X6ulpZLMf0Li+j7c86yCZ3etcn/spm4Ejx54IUa26LGrlJLuSFVIFvsIFozB62TsqMXVlq6/CpWpPSxBd/pXiOS4uYOXxtprO5SEIpqRSZG5d/7uRTaYbBrMY/OuMn4/OMD1mBp9xSLbQkZCaZU/pQS9pDr4BnFaR3sQnTyLtrQEOVkjQCMIWBiW//m9qkGbVjP8BYaAWXPSmKOe6KchXcWxgxxP1uaBKv7H/0b/QQAKdu91Pcx/EeZeN8mQLifGQDM4JuJaynjv9OISWgo8uHyTSQR3mSmeD3se7zNdOhQte0BSWmYgvsWFmrsyYuCKYY7IPtrerHe4Qo6cXXwYzArJi3cmGOdNbpkdHuc454gZApD28YsuNtyrNJ5wixn2C0dLzyfO7txmQxqtNLl0+hPQySRK1qin9TBypiWTChGl0ip7TfkmN2s6iqTsaHU2u9M/PeSCuAivgAqzlTn500cR9iH8ZoUKjvlyq3tXLw0rBxNSVP0K/jZbO0ZldSvCC0SS73oSrt3bltrFI71Aw91nCI8H57Aqctz0gh0pJOw6OuxlVh5r+leGafEeCwv/9V9zzpBvaYDjEILs/BEV9oKRmLjffMadJcrGC90THzEQHe3KFXq+76b/u6H7Jw7TF5hzrZXg5N+rDxAReX9Bs0iZpOU56MNRgeHnXynQ0s/S7zMmX6MFqX2lbkI5V/9UP9GWF3l8uTCtANznyNrpvulrVzpPyWuQ4wK4Obqy6ow8pRZJyZyprIwSLWusPF5M6/xA2Ayo3WDJ8aBmF6rXnst17qXRR6h4qN1xv5HkBTBvfM6CbLfS3p7jSylskljaGuBoaXB0UX0UHr+VImuIKaj5K+tFdIqJWXntzvLWrM9XTpIv6x8RN0m2CaBS3f5AX/EpUG+E8eJKxjh8fVGjRz4t8U8jw1wJbRRRNQjjz5FLVZggdIToEwSB1ybc9ZdqD6oBnJawqfwg95SVuJ//E2Z29XM/YXum0il/TMr7gr1O/pSxD11QrPh4DamikGbO3EbD/dQcwpcNeMx+4N0yIWoyuoMeWPlpXxmKqvxPmGr6f4Bf1yvwQITUB/bnVrBByFmaXpf3V9SejSFibZsrQOChzxnfZOpix7QROOdWz+E4pqvWciZ4J+c9Jp8TmVXVDO75XQP4Y5YKjxfAgBwTo7XBXw+zqVHPdl7OLvbLr6EkrsrU60A+ZFKSW2i5eh0gy2U2eUP9k9vDlUllnH5cov037BW3LByVE5AcVKiQQG8vZm0YCyiLxu0SMbAoe2+fJElHchZVS7Im2ss9FM+ecCvss+n7PxwkTsSzp273sqEVwTw48ViAGJTlfasnYEiZ2apu0F9MrrV/yDyc7HA6lD7bUI4AB+rTfuvPHKpry1pxqGVKpBniKzbyV8voWCVQMzAvZ6YuOkZOAog6ovKOE73GHlao78+DbB+lQtBDtHZX+my1UcVlcGdH+Hnlpvn4WJ3J1a/+JMkT2dG/of2hKBmd7uOwHg8zBu1kQDn5TOKUexw//9HG7qcZh9XDaVnFJe5tqfztd+RRG5UOwn61KKevDGb2S/yQ2Rcim4RbOlTEJZhTUF8nlSBsu7jC2dxVn24uRb/bxqbDY/YNWw3XpKLXIC/siJ5L3/RxEXYdEckFCQlYKYlBWtqUilunggY1QEY3SAt8Pbn72ciI28Cb5YkTNSytIO2IThQ6xSO77+cIKCsFW0j9yCdrZ8YVDcdM3ih2j86D97mVPyV6TYTo57WBC7s62DTUD6+0Bk89TcUsN+8Nnov4x9AcT/I+I2vdf5lvT215wAipixPAwwmltz9ZRH+Th+gVKXbbRr+8jgDq5lPGP0y8pGSMa14eAKqu0SJbXe2g1sWBRYGnNa5umR8Vp9SApkCdaW1UZKF3weFyXUBmvFP3gd4X82lvC76/SMwXTeBoy6b6exKHzYo40gahSrDQFc/yuuex91N3wSzn4MHsuPd3crBtZkUppwMCQ+++IhsOWtKEPLCKf+bFnS5ixvTbAjBHrcFbpkhTiw9O+qJSaxu3VSEyV+vpluXeEEkCHuY/7mDmHvlX21JJkXZvlknerNs5q8MAoLvRfxitf0DD9+LKmwjBO3cmLdp8yoRIUv4uoZaLsAWaR9GjgEcJb2W+zQkrdW+C8cqrnq56XuYBuMmqB+IwbWOQVw7zueiSZc+NTtzew1mnD8p9aZiK3TDCC3uP4y14cSl1bN6ZlS580zeCQVtv/K/zPy7UcvrIH8yCcOwHK9yHq9+EeaDy79loRSLrown96JBPr9VYjsslUFeiDzfuPbjH1jDf1QfoQG/hJGxp6jT5kcX7sBKikasHkLRW9ckfn9fS+v/hT0o+2RTzppNCdKhDVmVR5k1fEOEGwTeb+3YnKcSQXU2qTfezWje9yw+BjD61RdCD2yg0/Z5HwyFmg0MP/WmvvRzI+y3MxUA7wkgBMSoQA/6J1lbjBVZPm3qeCMXDD4NFA8Izr1Xe+wkiCLh1MncKUBgTN6SatHhqmgu9eQf09cuA7va4HgeYP27GrJw5ohJjz+7+/1CC/aRmStIOVMo4Q31TVHi1Oq2MImr5bZx38eHHTbbRI3vbClxKlIla+cVMo0GIJDaD9lg6KWOfEQArRV2ND2fcbv4z/jxLs7uKNOe/MvZp3RpxNPL3icaD2KD9itxG43HUl11+ZeNVGqK+iCsDdwo130TasI4bAo/VuUaQaJu5bpXF/xh3K4mfi4HJnxlYoGwvccORQOB6Fy9nzqQb5ovhlTXhoFZqDuisuogElkzSEv3BuUsHqddkPQSlAyJox6MxaUW1aCJ7KQGoBjhurOEvApaIhThFR9/eDkn0ngrkBj72ayZEzGVdUIaPiTlZntZ+4A+9MTaVDhHRWHUcUCpIonHkJCMi/FnV+0nArCHvtekGlh6a4UqWQrJvozr6qNcNWzIHnh4zlSAwZlp9dds0eh6NFW3s1cnM6FX51yleJQKsp+LIFMd+9g5hNl0cxzQ1Qemevi0IEi+LYxkSA5XMokCMwCohkqsGj4Xvbk8dh9PwL2Tp4ef0+PEphu3+WIDczcf1sb1L05IOKcpoMzjSGMJFUu8H3n4oQBQ9sxPZXxGjGJGwwmiIZQjluXnZmPKStB8Qq15PlUsuQv6N3S5ye0z28iZrOm6+dPMCayN8upD+HuMI6Zdkm0uIYSDGQOMI2KuXsmLc+py4BAw1/6+Gn0ogSP9pCL+9gHa7yGkkU1VGJUU4HXjf6EOmil7cWw8wM/alypjG0rh5Evt1uhH+XE/8Zvvcpk7p/8Tt+I/n9AgfwTPkI2NaMPVDpsE++22nnKhoNjIGzce0oYiNK+G8EiWajia/g5viRx41miv91LSPkGVhMZ0CLnuR9pjj25+LefCUHgp0Bc1aeiPcSxQKTPXv7eKsVpX/uLCu0pJUEcYl+pmNwGIilod0ApXefBNV4lvBAbGXPh+JLtk6A+cEqRgs3bcgjIcfUFDRyNJWDu557aiqWVdBxDGGCVd7FRMvOQl6jyAL69TDt4BgC3clJQefEvu4NnFM5W3IL0DWPjqg3OSbqa5wQF8197toOzkD5j9dlhEy2ooxAkYKZwcsaZmiBRoa8tSJwyb0iK7YF37Ut5Gr4Ok9Ak5sNqlVzdpcLQv3CwWyJHNXXr8pgfvdXeaMrqxD93sEHPo8N3bCc+3cdMJLHz9i46MG8ocIHX1HdsJ+ARW70h795r2AoV6dcJEydexkRgca/kUyGS/TvwCAiNFYs9uROU8ekBkVlSXOYgZ69bbiF6VVj98nCO69TW7o3WI5CNCW2AkuPnO9zflCvO0uMnMnGGXXYBoFY2bw1h/Qna31e6xuz6I4/ClUHB47Zdx1CD5/clf1UNrWJQa3ZcgbeipPQ7XntheIZPLmRliNZehLfFn+Sa3SgH2Zn0GcSW74L+tUXO2ZiNW3W0J0UKERifKcKvV97aKeMoR4gZdoje6M//dR4qYY+pXvLKA9rOkhhaiBKGz3/zafGTnvHADTDSA+6PpkfwQjwGHpIrb2eOs8Tc3nzK1OwkU+VVGiGn1LCZH0WH4mI2+HbexHgsJD26mH6xouKx4jOAmT6thLbNW7oiMzbKECKR5bQxaSXfBMUob+dGkfKBQv9wU3CmC/DCru7BFL2c4BVJAgn0bvsOD9+6cxuXjGXpf6mmgKEuLY0Xx1cnlsJc6Mn/4aaqsmVTt53Ukznq7PgDZ1ZpA0pqYT+nGOM+pp3izs4jaDnANe4kpDBbnFwwzN60FoTe2DSOHYBgm/ZMGdcWVL99yUTGOuTg1PLzRBsmCyHLMoXR2ychjvK7yTkeTxFns8n78aT3tRsaCHs6jpzWZYw1lEG9ypZdY3X9ppMAeVByQdYe9ZRZWq5RljE/ORdrW2rZtMYUXiwfgzJwB5JybBgN38hzYP4ICQxLuI+l+oKyVzKxT4ABVKHdjOyBltb0948nna4d7KAvy//IjIpWLV5LIxKxkQq1l0xRnNAy4HY35LsaTVljnTYEE6oyVKvZZjGmnMHp81Xmg2av9ghK0Qg6LWrqO3Za5w5FQKOj+Q/SDp2VJzE1y0q2AoySTvbT5P1VrtKQBuv5X/qcUrkitWLfjs73rUyMkonJ1G81wpZJhQA8SlfvcNvj5orqXuTpQGzZLd2qDBhy/I39Oo8GX42GIrpxz3a+1GsCSl59eaD2mwJ7iRmHO8DCVpQ2elrI4rPUzynjyAnD5RPusATtvCGyANpTQI5cZYcKtwziunwA6DzJYXeOLMKnUM/tI0Uj2Q85fCmnodk1SlOprBafSMu3H+GFO9RVFnM6MUzDRe4vKPzdo5TUjJ88vg8TYM8zBz9DJschNOtvcY3Daxi2/fdq2dDGsM+X+I2Dpf21EkGbW9/hREsqIgXQCB0dR3hkH7Q/wVNLtMPvfX7fFs8P3+JSKuKTpX+FLH5k3DZdL2/CUC2bmqn5OJh6j4qpbf6JnyJRwzvvIZ07xqqi8FncNGL5eS+6MbLWL0K6Md5ofbQKhQWaa3gmduG1cdVMctDjY4RNf4MABEr6bVfRifpDJwiCFZ4m3HwKvw3gwA6c8eDZq3APF6fgkIDbXmCxIPLwgZbmTij2Y4NN4s4r9tY20fsB2FkZOVPrEpBI9oi1nihoITBwpEP38//kYiT44PUirVUDUjKvaHRT9+2zogH/WAZECPPM1m2Qg1EHOe+01lSJejI8gX+QMnTZyiuUSEm5jvuS4ntPfLT1OeiuXdpTKIcok79LG3PGMuIDTkYDFG+7nMt1EiUL0h10EnGwylWE8sg8KUazPt1082OD+Ukg6VBQPzWgXB4WaCZTk36dhUEGZuLm+7oCpciR8Y8UwMwQgTjFGMgcj95eQYabcLeWKx4sfmR5qJri5N/aaCijTPAnsF70AFVZlq+uAm1LQs/7WbtLd1Sn6Fr+da2BgwE4IT12hmjPxTHd1QG9LOzht9wsa5XdhjITNGCoubi1Uz0ksZWABMws+7B2WtM5+cEDBNXM5O7Ut5Lq33TOs3ZYnLJwGA7qiCaJpnbvbX3OZ67ufE3Rnu7HPC6Sj+07ilTamzRo3bpcfRuv53UOMQeHFYoVpODfR/eOp4EHdFleOaH0kMtk9t/TIrmhr+ujGAfwiE1enYm7WN0mzUCIjiyqYm4DXNv2NuK+h6eCqPuGg/yKH+FFPJlXREnKTq4N7RtuAe8W2CapuuXkUv5QR7bF8N0gxtIYk2XC7IGtO5UcvRMbTRqH9LY+EIP3qQTQ5PncFm/rzyJAozL/3nEX4aStMxyN5kV2vHNSq93qVOOzbpuxQUFed8r9Kl6FeoKGlJRPhhiX35Gf+xI8gVl27YQpgjG4ZLoWwjmaWhy+aYW9gjNASMHPXayISpCaofT/AL1ScRW0tupr0u2IPC/jn6lgu3ndNmXk2F+nZhPhmNJBbCv8vJMe9rKwVl4hupBhH0m6iJUfBq9KSNKiGCi5dOVpqzEoN8rbJJ0NM8RAyoadaSIqXetVmXcMZMyR1vfD1WvrJwUEd/Ez83jBieiUyY1/ttQLp1TnbDewKUiIHOt1Id4HjXmoPmdaAkG5ZduI8qMAwdGpzswfMZWxsuZp+qHXsgBCnB65xBxz6FvUyYPpoH2hDgAVPIG4i1s9G83oreUpQGXTAQwYsd5M6t5hThJXBjKzHMuzMwQRYp+bTwzRo0Os6UJEiajGDMZLOPNrv/8wfjQXtQ6Ei2VQPt9VyWrvStzkZQnywq6KlGdQZzuJwkxLdNYZFmCVRfkabLsT32gLxSc/Gwk2vsmiiGMkL7Zb0DMHfp+sld/0CPIL/yy9J18l0KDyaLwDQS/MWPU6gBVoozx4gxD0pAyS6NUhUpjYSfk9yuTfbkeJ4ui3HCkGyiT5HQtWW02h5a5HeQ4BQqu5KWa16A8bnheIaw3evTJQmiv6UoCM+uIiLRWyYHp5BA6xlaoW3BwPSncrPOpy+1y0g0bVG2+l4DfmQ1M6gWaHVH43q9InXSTP2UyusevABEyq4rpQHB5I5OgSP2MAx6xkY+GVJr31Dl41maoYWr3rk/kHMPY9PfdOeWEl8PqCpuW2Ar3hQX5dN5L4onuM8ZEF1V5JcpG2u7eehCKVhS2ZhDCDhVoKJrRCWcTQVhBPi9ksEJNpSSEz6ntZkIWL6Q4GA0UnMW6FuQ0uQd6Z6Lnzp5RWwp/udYu+p0IbbMjW1EiGFCeCe/2B03Gwu8tcvVnLpiR7FmnipkBI4q/mob3P49cOVjBzDAwFKB4+ZKd+WJJi19kTYLxrtET6hUsOfe/MHrRQYKcuMSTH7dzCniZicIpEp4H5sKVvtIplKBxw+xLK7rE0YBeW6ri/ER53/BDLsEvKTV1LiBCyE8tFJhscnl1RBgpFJNhIO/WaNhrY/FVIaN6LFePQ9lQ70A9OrukH5Zz8QZ/iXlH2OWAraRIaUpgbaaLRqZQCdrYVC7Ki8YmE4Ax9KJNsB9RN7mFmq4RpwJWBn0ZmdRXqVFQA6WmPK3B9rwPOOhtSbGN5g1JreBcDObz8N0zxGKLxbjqudBoJvSMlr4E5mvNNbNlTIYSURbuZumgeWV9dDn0objl+NOVOaiCzkJ1RAgoqOV0TPAQ8tq9ktnP11FZbqb5eWYqGfKPehAeCXhTSdtif6182W7YH2+NxVXX/T31iuRUss6nnIwtrH2adQCt2l3PyJK5c6XfxBzIRhINf8aOe1LP5dw5hhBb5HLfs6iOLjshjY/AqfiDtk4sG4DBN4ikNulawuuuFHYI7+dmDtbx+oJ+eac1AUOlUFT2/2/49ElA8qJDjj0qGaHCKfbrs0K/XGUBCf4RDi4x/z/VduIdTDxe4rm+5mulERjYMrzzuLvuZg6+IDPnWlnhrR7gPj0TW727tcxkDY3v/+tFFCB2E+aT9Avw9Y/bGzo5VOtIja/jSBUp1TneR8S+/0SPKElA8TJITicUDAGLFPqYMLrfu1D4ocK5bLXin+cVUQ1yp33EZWc3EjywEz+t40LqAD9uXqt8hRnbzooMoW7ZnCzr3lwltZmQk33v3TUWJDRQCTaBtF4MDlz62uukqB8mEtggIA91SPNdowA3anfmZ/5RkKE1Chkl6V4AvnApaoy4xMjm5WScymxzIfh2tNQuxS0DzYXU8BY1S03XTC7IEt5hPxUwJZL6fKwIBz85IgR1X3/s7l5M4OV/WCIleyZueEBBp8meJIDs7vyGBeWMXaT9nM/D6fGbtuG4v3Bo8/LOBZostIHm0Iv//WyfzaXcXfYFt502CT6EbHwQMMLwQMeS2w5CXf7Dy4hn8inE8iFVxWftKIAD/S+CIkmnU5uMUM0gSuuwcS1LxhGmfDiA0GphzpF0LpIRRP/IAF+DMoPM3mPT0PkpiBVHe/Ni3jRdL5vElmxIr75pBnRwLWY21rcgNb8kICH8MzGNg+PsScoq+9tE9RmgZvSAPrJb1md6NxJREolsjks0+FArM3Yps5N7EuNVbq4Hw1C0j4LcNnUpkA56CzajgCM6nQgu+ApYepTUYYIk+nDXLL6eJetS//q4hqcWyKb7b331pjsqDat8ZHFJ5yIbVvmg6FviB1h08Chs2vhn4oH9PvEOdsjQNwwyomXcIkMJOm84fcrDec00191UtuUen9jlxeLUntDlKjmoA2ML0ssNPRKqakOmzXhy0o0r6QxUO+qrqAVy1LhPEkiaLXrKqESdMOY3lU+AP/cJVm9JQuMPQdli7XReDrWF18HUHc49LwBqveKcofand/ZwK1cuSkBzKDsDKvrE4Q5RWzOJOyhFmTi8vfVuT0blLOUZRDnFD6nOPAD9med8yX93g5u1qh1+0z0YPRKbJLmO+D3Rl8Ca4bNyCdFHxbGtYzUxTgKA1staBG2UD51/Zz1LEQdb/PNOhgoN7SSTQNe8KTWcXFLMapU+ecFLKUE49dYQNhaSREPkYq1yEMBsJw/1S0VpWqr6rtM7WJX7ruc+RptBU5lKOA5PNHz5eE4nOaEgdk02MhkcNY5nIqJT++iIyFATa8bTBL8erBLYYRCcB+upnmZqsakJPKW0WdXy9xa7f4jr+7azpc++0Q+X69D4MAmxtRTFPuEgUW1G8Kdi611gr+BTnNEECbGwvEsbisCWt9nwArc+aCNjwXsBJiYzjti7froS4BnHW4yQQ4EJZoMsYUcGxrPQ/KO6wTwEwO05bJpANCEG6HFlUgJ7R/EuLY4ZfTH/hDF77oPMHKhT6MTpWWnA7t1eTL115mS8ZOlo8FHsNBvvnalWu7NQn028+nlRPTaQnoZRe58abeI5jGTxxWKnNpKxMizrxc6eAEkwMipbjFuylsPM2nvQJlPTQ+7eXNLUna3sV8oTlnN0nuIPqn+uao4ccr6nNLQnIEudz7JYUI2Ijo3fQJFo7yNcFqMdoqXIqnp8EBmTpZfCDIGnLk50+CsSFySwLWP3kBWXV+CrRZYY4w0imrPmyr3q89R+/yzVQmi2l4DuTTygc9yGqle2KIiWGbOw+PT2nrYukqxPH/3MUAeUCG+lOskBTanuNRer6ks1UEgQlwTTyObSfq+13zTWxbPBwyXrY0C3IIzW5Re07QkWzMvxxBm0rVzwHoy/e4kgsCslONAelhle3TQyfFnH3cahQcujXHNJQ0bNxsAPBqfHDKxmxG0PmBkjpCXsXbbN7IDVaO8xrafR1jfeJuSyJL9LSB87dnKligCYpwOKZ5wK+DZtjRHBl1Eqr7EOmeZ+esY1qvniEVw3mCyMTcArzTeFxB+x6sZTatBuUUDBXKgsNhHdsicOy2gQRMfcT2ElY3L8D+cLhcpCkP24r7KWHdKPog1W1yRIHLdttbOc//uq8jP7PNBzyg5muQzP/DB7b43VaR21h3TOrzrJiuj2MjZQiNVz38HjqWuJ9kolGq1igCWsVlmZo0/IbiLobbfEN3iE56rFFUwK+HQc8+nyF5QHeUPIeh564EbiqWqitk7Mp4Z/rbR3B2Qw1q+Et/5fN689lggM/3Wv3T/GqNfLrDZ3F698MwEw5UBcChWV1Bjwsq4uT4nTMNvWIH5wCstmuwUQNBgEjqkoxvpZnkTp0wI6RQEIt5J7ciEMz92+FMlA7GV1wivzA5EgpdJKOttoKcDM6ugo6B4yYKOwQ06X2A9Copaq7/+3+G43IrpZL1RZCr+qeW6kFs50M+XEMOtB9XahVQHXZRvyqn909ehu81ysyaHD1wOoU1uQTiQqF5NCrlNywZaz1ST0K4St579fHfaTgYfDmREQuOJ86Kt6MwDT/j0W9Y3Sc+a7QUaxVAGnLm0aZKo4mjmXpxY63WgfKrGhrLoDwEdEqHehIwQFTavPrFrAON/f22qVNbllpqW+fsfmNkjao1vTfIQH/np4LA0v7xTuCZJTS1uNyFejx76D2lBEuSOMVlECPVg5A36Y1lrMBVmo5CzHBS3XCLZ5eOM/ywl1dfKftyIVlyhErOGHkDrzFwPYtXxPMXeQedoFwIoIxFdobTb8rK/3xRZEtS76ybaaaCh0nfshoDCkB3NMxkAujMonQgYF8qpgp4DjZ7R9Mo6RTLhTFtSChI0jLDe9W9jrbZD84pnF/YDkBaF7XzqhDVkdu6A3ikqrIXDYNaaDcbWeLLEcGl/1Uzt6pZIKTJg9H8VNZPXQADcQ5yyP6HFi8XY10Jk2OfOZwph/RChK/J/+/PLh3glp3926yOBldhtfzowToTBZDEwLjL8l14KEGgtsUU7NSKxm/sjL/qDzQgoLA8ZkycCtChrqYPmjOx13azAmRRYizxaQOQ8ufzbJv6D0Ej4nJ06Ee0zPH/PEFG6kGTV/R/1pa7IzOTu+N+en36Ri19Vei0KbUlOyteFDLcqfeVxXMLIjEzAwDFTuod7XoVXC0bZV5JdLfC3QLxaKUvUIewjnxe5CMTMsSlzNmLMt3C25KnsNj4WeaVPRknZjKcgst5c6RcNCET1hqpwhdXuSNl8OWvJO7K72AIwQ3HSDUBooFzw07SGXu2EQzh639LtpkRo8RBIP7DlZ3nGHvElRnReGeYwFOmfqHcLgcnHazeSX3D7kZfoLRib70uZHiwZxMifB8gr4hPY+kqngcdbqHxPq56UHMK/CQoRm3fljsICRBri04/LYX5QYvuwyUCRF+80OsO9nt3vIfEZAjjXFgRYiLxyIf5axrZc8N/wDalqJS1/yj0GMy75Sq7KLJqrAgLxtG2lc8GBgXWuwgfsH8r0Ei+xkkKezXcFYUnunOVdKpJpFAa1GkNYbu8rXoxlQHsYBj4ByQJ16cHBynQVQhZTIFu1mEXHvcrPPn4emDYTxiaqv6nJkukRCUiqzpMJvSCSMiqwf7mb0qLDEZ/EcxReIUxv+aUfzh8+A4hqkcVBGKO3im8nda/kZEXxgfYYc33xePkUBBoqS+N9J/kHpZ4oJRp4NkUwweraJd9hvm4T7boaJ78KQWW5WRF0rSyiR9ZmwzVtK3fKVX+wu/ES0DKfgnWHzAQlFyAZBUMDvy4XOwOaQauvwaFhqzm7CjSaAOZ2rBUFqMnxKQ9HqfHN37M8HLNIlrtLr3Fupa/GHiSuwwIOANRFMFaXNiU9ecf7k7oIxlXcPEfeO9eNHNmNUQa/tiZ6WBDjiPDv/jo4HvpYpczlNftDDPsdJaBGtfKuXN8xzLxxmh4qggZGZBOIN8xw1XxrpD8iOV5tuOWcHuLEfJy0+1zML286XfnVJza5+J0ztA9TYIP56SzMkR6ZEWK5ye1nDr1YYTrK0sUK5B8ItSw2Jta2ykqpAacnJAa882VHIOVOY4I30pNNvK3lYHGaye25VWHJfCnDpfeR5AKcGqLQ5sHFzgdkQo93AB7G8BTD3kcjsVJyu3X+PFGdEOQpuOpdjvgziMv4qQhMsNcNwUeKvbti+ul4hcww0cUtawkkpdbKBn+Fz/BwHHeiB62D8jWqP5fVVkFHil4RczIVRMkG4ikueb0QylTQL+ppY9CwOPt7rjZEDgpZmDp7v1iIP5lAnd4bKF1s/Pwpf+O4d4hamUjcJ5nbl3/tQHlz/6c9ndi58r7QFd+X+mPV4btxySLD4RkmMDqkWLEH5np8LYLxfxFnKyQB5u6sOsYIv7mNutS4jgZVzcaq1U844+Zs330PyvJ68QKe+TH5fbR4nrR8//2EaT+l9rNmpwdwHp7d8og2Q5Ro8IKgl9z/CWa0ivmAhuEAX/lvWqA1P0S8VS3yAcGVqmp9sfo9GmRVIS2RV1+cTpU5Ojz+CZV1nkvvc003YGFJFLzA8sja3rEKbofiqPhuGNRcygtykf4tVATn5DaJn8d35ZjETc/1O7zj5/OHRRC0ZNRDM6y5kPaMc/QCe+SWdjncvtAeA3UK61s7O0X81pZL11Tb69Ajhvt+e5UkeHCBAcfYiFwD5WxusSyOMEmGNSgyvc8sbR+nPQqeG+RK3U8H1uJ+0TADH6BC89j2sqyoJQHSDNWR1x2FrtLukXzLu2P5Qkl+MKTaWAyOsHzrVmlZHgW4XzAhVoIr14UBHi2gs9ojHwGqQVav3oFb1WihtP3V+U0xWwsfae27F/8btDspUdwL1Heo2hoXTuqGwhQOwz5+PdLvlwyz5FN5zs9EQXfIwGKC6LSemhrpOPbeEv4BLsQVEjv8+SB9tto6TjRslmGpWz8qL8068a2BrYgCx7PCfcBFcIi+LXP8p51GG5Mnk8Xpr+JbAk0r0iN/y0HGTdBMaIbE1MEEJs64Tc2CzWzF/eVxnsmwdStiqFlH0aVp1yOqemqfN2OJ1UeVnT7EJHEqpmp7m4d97nGS0GYJbwzyeKNut7ygu7eElTiJKfv4iRc8s9VfDagLoNXIZ/ptQoZ4BRIo1FgyG1/y8NQYlGOew2jnXc5/YtQE9oBCB5q+Mfciqf2VulT5bRYDNA3kLxVggQrITMHSHX0r47Qd3T2AszMt5Yk0GtI7EzXNTBz6sx2vUnYtlmlg/7lpgsxM5+iZlPT95owZpLKo61VnfMLcT55+8w/T8gWjZMB2ogFGTymb5NawAZshZXNXbKGx7tYOWHa20ETvHz5tlTF/3AYrRtPZ1EH2H3k4nf6OhRrkGiU8DT9FyOKuYENX0n1cMLxKijw6zBeRbRpYNyN1jtq0wp76LPO4+ZLCpENNyT8J9WY4PGECgy0TyRZBePsXw24um4eg78rAxr0rinK5bPAxpdlAlJKDs3SyHy3YLQ3cwJB9jFseDQVbdwz+I9Mpk/nZajqcctsI/b6f0iXB4REXpTJGGr5OetKmU7pb0IhDRjWXS1H+32BuI96GwII1fF6fYR3iKxM5s8j7oGc7ii7COlKxvtP4tOJcMycSGGyLDJpXZrMQ5GfaS5Rtu9ZeevuaeVKD5V58bS3N7WF0ot0EPv8fdpz+Cv3j5F+DgHKVBCjDhAzelNjzCOTDNu2PsH84m7XjTqmt3+MgLa8d3gA4BXo1Y+cgrI8zqvbbkn7W2oXkxEydTfjXXETVLOD6vks7fmQfQP0h0WbCoxS79bM/LSF6xpHNcCz9bypMacZXKpCIh6tEIzoTa6YnphIrk/Cfcc99ynbVOPnsHIQPnDRmZ98mX1V4glc0q0P4fdwe/VeMMdvhr2bm9V7Ludp1Vt7EEzP7zaLDVzSMUaVXnPcWroBIpXGADfgUcI9FfxgphGTTTf5Rdm/tgaN47B0xUdqqtyo7jZi27L8H85gUdj5SdZR3V6CJVRKw76AM4c/+MiVyP9KC0jdG3aOnmpw/Rn9qLw01tAjT8tgpxPdIJG+S/DR2dAB7Rqw+olPWgXK7h34KF9SvaZko1m5wf4BD5I6BR/L0eQWC+wBXzIjKBIWh/3f6tv3MTnz1uTS8f+TokpQK1KwJawwZZ+4sY/9FXWL4E3gkIoHCVEz5GbWzJG06ffa6qBn5c8LKkdQeXmmnk7Hjefu/hMHn5iP5gGLG6L/0fJyqrsI10m7Tt381WiC/yoRsTH/y7UJt+sr7OF8o9vJTma+3C3D9TT3AC+lAUkNX43qRofTN6K6oZrSJx0oUf8GvZ6iUCP9IEJ7/zQ6L/qTbKfS1ZDCWAadDQnxuXVKzP8xgyObiKJe+K95rXad+oGIkfsFPxhg2badQynu4iA3sG+TznVRp6dTGZbkW8EncBHrehDuMqALKCVQK74QwMrkIH5GXstjytQTfBeSLzF+cs9js1+XADpNOa+ZuWnWvKQAlgfvvaEuR//yr1UxHiPy/T/lAcURhLgzOk5zkvolm55Ccom5l4gTfMF0q79/fE128L+AFeljBuu8X/EAdWx4ssXHmQsrUHKvFpJHs1HB1M/iQOUX3w0tDTL3hQaMt1OzvG1iq1eDvgSMHnV12v9zWVNXK/DlYMIiUgNMbdyrlpvPObk7RJAoryBm815M07l+vXvW2Mxsq7LsJeNy9n7++JrN48RMwgSo/Pml90oHwVGHfkkpgmBnUI8T0HR/VpJpFuLGftzwYQ9t9RvGANszawAGqWLkql6H6SpGsVCPkMxiUJj+Gf3PgKqD/fE0sqVwGxOgbs87+KlBLpI0C8WkFKwQ6XwVuRir/vdEmuKuDwcoU1zgZuR6krcNUOBHmFzAutdT0kF2077WasYz5rayJvG5kEyF3FFAtblg8q3hmrrWlwkJw0Kgo50RoXNHGCsZU9uGBPmdvwCXuhze115DSHkNcV28GhAs0KsA4ssDIOF63d8fxSvIqkA1/XcwpnTUdlrzwH3j/crkmzAha3yovQDR/Q2IB9ck+Tj3jKULGEVoGRgqqBdLLZXSd604Hq6+UVTuefXiIPybHu22T2a0MveNrTgwug0OjvZv696WtLEFW1BmS8zKL/XhekKYrIg4Ooksa16AsJblEOtDaGohVMtTlgFzBYjh+ZgB+UwYGjc4o/nfYaD0yAqbRDKscKdVZJZjZaKpz45swP7LSN+WMJE1gPM/uwtKluD7W35yWrzjJxA/cQSz7a56J5HTdoIGNgaWy1aPWM5giggVo7S0Gthd8VMphs3kHcQPDDbGfohxY71oBaPhSbKB3VkMo2FWiNMY9vqK8hcWlIcvVuZD7GVPDTTQ4W+VwszvA78MVK/B7iKHCd1+cAKZ1KrCwWtzZ5GIlcHtDytpR9eCuA9qH0CE37AwB3mh8oU5v0MmZe+ZmF2Af0Kf/jbeVZXmIf5GltwAG+p7nRDlNjIpu1s03Eb0yCTtaE3XyAQGbfK1bVwhG61tryYPhLiT3M7pn+v+VbYPw3LTc52IAIisqJw3seYVUlPWvBGn/EuBBmztmTlrkgcQzshiyOj/giL2Hj1Tf8+3Gwz43GNSC3XbyRNUCI+3Mjf4qNoa3PfcX2n98MfwRLVDUvV1osShzPaSNj6I1IdkjX8T9xcIw7/jcHwsKGDvlpS/3k+nWqxvybPNFXp6bHZo2b96TEVqCOxjdhcq2xe9MnKRk/fPRAICgaudE7zCIc/jBEVThQBEp/UzwvR/E/GqB02ida5hZMV0uMGLAl7HGlXqDC9q2RMgibkWoCX7y2DHDF3bN8FMdCURp/ymLBCPjmpsDeUbysjNeOzEVDqv0JCWSIeYluX43T/8Evin74S7YEU4P0kFOHgGP8bvEhPkTykskRTYMhf7Xkp7XHYJXRvsfWqjwaJFZn+G0SQMuFanR/ft0gwm+91dnaFuTxN7xRbFvxQ5c3n6sbCcnaRW6YQxrkcko0IPgJ5k2SvKHMdZMnSD+vAcDpKtqdiv+Ni/9E5j3PnFZZD8rtkSxmRPV1ylP3ic3ZGF3Gwc7Eczyb99xfKSRoWQ4tqL5rKaBXbQwUQ0RwVIgKRtn1zR2/CQfzldoMnpcjirE70bXpXfNytYv5d64C4GwwxwwuFaaphMcO/UyodMWZWnkThLEkFyBw3JGcbgwSmAN9pKHIYtc0Q6vn7rRSTxv/CeNLFtwojib44/dzi7xNwOfd10txRTYi9KUif21elscyJs/NwimCpdaIjqh8QiUc/JLZI2UckWdGTMfxT+ymlesJkpF4rtQEQa2P8OpP8p646yFQAAAA==" alt="Muo Nso Asalu Oku — Fr. Bona Umeogu" className="streaming-promo-img" />
            <div className="streaming-promo-text">
              <span style={{
                display: "inline-flex", 
                alignItems: "center", 
                gap: "6px", background: "var(--g10)", 
                color: "var(--gold)", fontSize:".68rem", 
                letterSpacing: ".15rem", 
                textTransform: "uppercase", 
                padding: "5px 14px", borderRadius: "20px", 
                marginBottom: "12px"

              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg> Now Streaming
              </span>
              <h3 style={{fontFamily: "var(--fh)", fontSize: "1.5rem", marginBottom: "4px", color: "var(--white)"}}>Muo Nso Asalu Oku</h3>
              <p style={{color: "var(--w70)", fontSize: ".9rem", marginBottom: "18px"}}>by Fr. Bona Umeogu</p>
              <a href="https://music.youtube.com/channel/UCdAQEoE6u2HqY0rHsmSsUOQ?si=_ih_bvj0YZyctt1R" target="_blank" rel="noopener" className="btn btn-gold" style={{display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm4.8 12.6-6.6 3.6a.6.6 0 0 1-.9-.52V8.32a.6.6 0 0 1 .9-.52l6.6 3.6a.6.6 0 0 1 0 1.04z"/></svg>
                Stream on YouTube Music
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* FEATURED EVENTS */}
      <section className="section" id="featured-events">

          <EventPreview />

      </section>

      {/* ADS */}
      <section className="section" style={{paddingTop: "0"}}>
        <div className="container">
          <div className="ad-banner">
            <p>Advertisement</p>
            <div className="ad-img-ph" data-desc="AD BANNER: 728×90 leaderboard advertisement on homepage. Replace with Google AdSense code or sponsor banner image.">[ Advertisement Banner — 728×90 ]</div>
          </div>
        </div>
      </section>


      {/* STATS */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item"><span className="stat-num" data-target="40">0</span><span className="stat-plus">+</span><span className="stat-label">Contestants</span></div>
            <div className="stat-item"><span className="stat-num" data-target="10">0</span><span className="stat-label">Weeks of Live TV</span></div>
            <div className="stat-item"><span className="stat-num">₦6M</span><span className="stat-plus">+</span><span className="stat-label">Total Prize Pool</span></div>
            <div className="stat-item"><span className="stat-num" data-target="5">0</span><span className="stat-plus">+</span><span className="stat-label">Major Events</span></div>
          </div>
        </div>
      </section>


      {/* CONTESTANTS */}
      <section className="section">

          <ContestantPreview />

      </section>


      {/* ABOUT STRIP */}
      <div className="about-strip">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <span className="section-badge">Our Mission</span>
              <h2>Rooted in Igbo Wisdom,<br />Built for the World</h2>
              <p>Odezuluigbo is here to bring joy, pride, and world-className entertainment to Igbo people everywhere. We discover talent, celebrate our culture, and put Igbo excellence on the global stage.</p>
              <Link href="/about" className="btn btn-gold" >
                Our Story →
              </Link>
            </div>
            <div>
              <img className="about-visual-img" src="https://oss-macaron-user.macaron.im/photo/6e6be563-ea55-4e69-ae7d-8caf6fb1eeb8.jpeg" alt="Igbo Cultural Celebration" style={{ width: '100%', borderRadius: 'var(--radius)', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>


      {/* BLOG PREVIEW */}
      <section className="section">
  
          <BlogPreview />
        
      </section>

      {/* SPONSORS */}
      <div className="sponsors-section">
        <div className="container">
          <div className="section-header"><span className="section-badge">Partners</span><h2 className="section-title">Our Sponsors</h2></div>
          <div className="sponsors-flex">
            <div className="sponsor-logo"><div className="img-placeholder sponsor-img" data-desc="SPONSOR LOGO 1: Corporate sponsor brand logo — white or light logo on dark background. Horizontal format."><span className="ph-txt">Sponsor Logo 1</span></div></div>
            <div className="sponsor-logo"><div className="img-placeholder sponsor-img" data-desc="SPONSOR LOGO 2: Corporate brand logo placeholder"><span className="ph-txt">Sponsor Logo 2</span></div></div>
            <div className="sponsor-logo"><div className="img-placeholder sponsor-img" data-desc="SPONSOR LOGO 3: Brand logo placeholder"><span className="ph-txt">Sponsor Logo 3</span></div></div>
            <div className="sponsor-logo"><div className="img-placeholder sponsor-img" data-desc="SPONSOR LOGO 4: Brand logo placeholder"><span className="ph-txt">Sponsor Logo 4</span></div></div>
            <div className="sponsor-logo"><div className="img-placeholder sponsor-img" data-desc="SPONSOR LOGO 5: Brand logo placeholder"><span className="ph-txt">Sponsor Logo 5</span></div></div>
          </div>
          <div className="section-cta">
            <Link href="/contact" className="btn btn-outline" >
              Become a Sponsor →
            </Link>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Voices</span>
            <h2 className="section-title">What People Say</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card" data-aos>
              <div className="t-stars">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <p>"Odezuluigbo is exactly what our culture needed — a world-className platform that makes us proud to be Igbo!"</p>
              <div className="t-author">
                <div className="t-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <strong>Chukwuemeka Obi</strong>
                  <small>Lagos, Nigeria</small>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-aos data-aos-delay="100">
              <div className="t-stars">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <p>"As an Igbo in the UK, this platform keeps me connected to home. The reality show is absolutely addictive!"</p>
              <div className="t-author">
                <div className="t-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <strong>Amaka Ifeoma</strong>
                  <small>London, UK</small>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-aos data-aos-delay="200">
              <div className="t-stars">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <p>"The beauty pageant was breathtaking. Igbo women truly shine on this platform. We are proud!"</p>
              <div className="t-author">
                <div className="t-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <strong>Ikenna Nwofor</strong>
                  <small>Enugu, Nigeria</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* NEWSLETTER */}
      <div className="newsletter-section">
        <div className="container">
          <div className="nl-box">
            <div className="nl-text">
              <h2>Stay in the Loop</h2>
              <p>Get updates on events, voting sessions, and exclusive Igbo entertainment news</p>
            </div>

            <div className="nl-form">
              <input type="email" id="nlEmail" placeholder="Enter your email address" className="nl-input"/>
              <Link href="/contact" className="btn btn-gold" >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </div>



      {/* SOCIAL */}
      <div className="social-section">
        <div className="container">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.instagram.com/odezuluigbo_tv" target="_blank" className="social-link"><span className="s-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad)" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="url(#ig-grad)" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)"/><defs><linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0"><stop offset="0%" stopColor="#FD5"/><stop offset="25%" stopColor="#F56040"/><stop offset="50%" stopColor="#E1306C"/><stop offset="75%" stopColor="#C13584"/><stop offset="100%" stopColor="#833AB4"/></linearGradient></defs></svg></span><span>Instagram</span></a>
            <a href="https://youtube.com/@odezuluigbo__tv" target="_blank" className="social-link"><span className="s-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M23.498 6.186a2.955 2.955 0 0 0-2.074-2.09C19.542 3.5 12 3.5 12 3.5s-7.542 0-9.424.596A2.955 2.955 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.955 2.955 0 0 0 2.074 2.09C4.458 20.5 12 20.5 12 20.5s7.542 0 9.424-.596a2.955 2.955 0 0 0 2.074-2.09C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000"/><polygon points="9.75,7.5 16.5,12 9.75,16.5" fill="#FFF"/></svg></span><span>YouTube</span></a>
            <a href="https://www.tiktok.com/@odezuluigbotv" target="_blank" className="social-link"><span className="s-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path d="M34.1,11.4c-2.2-1.4-3.7-3.7-4.1-6.3c-0.1-0.5-0.1-1.1-0.1-1.7h-6.3v23.3c0,3-2.5,5.5-5.5,5.5c-1,0-2-0.3-2.9-0.8c-1.6-0.9-2.6-2.6-2.6-4.5c0-2.9,2.4-5.3,5.3-5.3c0.5,0,1,0.1,1.5,0.2v-6.4c-0.5-0.1-1-0.1-1.5-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12V13.5c2.2,1.6,4.9,2.5,7.8,2.5V9.8C36,9.8,35,9.6,34.1,11.4z" fill="#25F4EE"/><path d="M35.1,12.4c-2.2-1.4-3.7-3.7-4.1-6.3c-0.1-0.5-0.1-1.1-0.1-1.7h-6.3v23.3c0,3-2.5,5.5-5.5,5.5c-1,0-2-0.3-2.9-0.8c-1.6-0.9-2.6-2.6-2.6-4.5c0-2.9,2.4-5.3,5.3-5.3c0.5,0,1,0.1,1.5,0.2v-6.4c-0.5-0.1-1-0.1-1.5-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12V14.5c2.2,1.6,4.9,2.5,7.8,2.5V10.8C37,10.8,36,10.6,35.1,12.4z" fill="#FE2C55"/><path d="M33.1,10.4c-2.2-1.4-3.7-3.7-4.1-6.3c-0.1-0.5-0.1-1.1-0.1-1.7h-6.3v23.3c0,3-2.5,5.5-5.5,5.5c-1,0-2-0.3-2.9-0.8c-1.6-0.9-2.6-2.6-2.6-4.5c0-2.9,2.4-5.3,5.3-5.3c0.5,0,1,0.1,1.5,0.2v-6.4c-0.5-0.1-1-0.1-1.5-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12V12.5c2.2,1.6,4.9,2.5,7.8,2.5V8.8C35,8.8,34,8.6,33.1,10.4z" fill="#FFF"/></svg></span><span>TikTok</span></a>
            <a href="https://www.facebook.com/share/1Bq6LaMjwa" target="_blank" className="social-link"><span className="s-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/></svg></span><span>Facebook</span></a>
            <a href="https://x.com/odezuluigbotv" target="_blank" className="social-link"><span className="s-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#FFF"/></svg></span><span>X (Twitter)</span></a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )

}