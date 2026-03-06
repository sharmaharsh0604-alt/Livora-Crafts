'use client'

import Image from "next/image";

type Props = {
  title: string;
  image: string;
  subtitle?: string;
};

export default function CategoryHero({ title, image, subtitle }: Props) {
  return (
    <>
      <style>{`

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500&display=swap');

/* ROOT */

.ch-root{
position:relative;
width:100%;
height:72vh;
min-height:520px;
overflow:hidden;
}

/* IMAGE */

.ch-img{
position:absolute;
inset:0;
z-index:1;
}

.ch-img img{
object-fit:cover;
transform:scale(1.08);
transition:transform 8s ease;
}

.ch-root:hover .ch-img img{
transform:scale(1);
}

/* OVERLAY */

.ch-overlay{
position:absolute;
inset:0;
z-index:2;

background:linear-gradient(
to top,
rgba(6,3,1,.92) 0%,
rgba(6,3,1,.55) 35%,
rgba(6,3,1,.25) 65%,
transparent 100%
);
}

/* CONTENT */

.ch-content{
position:absolute;
inset:0;
z-index:5;

display:flex;
align-items:center;
justify-content:center;

padding:0 clamp(24px,6vw,100px);

text-align:center;
}

/* TEXT WRAP */

.ch-wrap{
max-width:720px;
margin:auto;
}

/* BREADCRUMB */

.ch-breadcrumb{

position:absolute;
top:110px;
left:50%;

transform:translateX(-50%);

font-family:'Jost',sans-serif;

font-size:.55rem;
letter-spacing:.18em;
text-transform:uppercase;

color:rgba(253,250,245,.35);

z-index:6;
}

.ch-breadcrumb span{
color:rgba(253,250,245,.65);
}

/* CATEGORY TAG */

.ch-tag{

font-family:'Jost',sans-serif;
font-size:0.55rem;

letter-spacing:.22em;
text-transform:uppercase;

color:#d4a444;

border:1px solid rgba(212,164,68,.25);
background:rgba(168,114,42,.08);

padding:6px 16px;

display:inline-block;

margin-bottom:22px;
}

/* TITLE */

.ch-title{

font-family:'Cormorant Garamond',serif;

font-size:clamp(2.8rem,5vw,4.8rem);

font-weight:300;

line-height:1.05;

letter-spacing:-.02em;

color:#fdfaf5;

margin-bottom:18px;
}

/* GOLD DIVIDER */

.ch-divider{

width:50px;
height:1px;

background:linear-gradient(90deg,#a8722a,#d4a444);

margin:0 auto 20px auto;

}

/* SUBTITLE */

.ch-sub{

font-family:'Jost',sans-serif;

font-size:.92rem;
line-height:1.9;
font-weight:300;

color:rgba(253,250,245,.6);

max-width:520px;

margin:auto;
}

/* SCROLL INDICATOR */

.ch-scroll{

position:absolute;

bottom:28px;
left:50%;

transform:translateX(-50%);

display:flex;
flex-direction:column;
align-items:center;

gap:6px;

z-index:6;
}

.ch-line{

width:1px;
height:40px;

background:linear-gradient(
to bottom,
rgba(168,114,42,.7),
transparent
);

animation:scrollLine 2.4s ease-in-out infinite;
}

@keyframes scrollLine{

0%{
transform:scaleY(0);
transform-origin:top;
opacity:0;
}

25%{opacity:1;}

50%{
transform:scaleY(1);
transform-origin:top;
}

51%{
transform-origin:bottom;
}

100%{
transform:scaleY(0);
transform-origin:bottom;
opacity:0;
}

}

.ch-scroll span{

font-family:'Jost',sans-serif;

font-size:.45rem;

letter-spacing:.24em;

text-transform:uppercase;

color:rgba(253,250,245,.25);
}

`}</style>

<div className="ch-root">

{/* IMAGE */}

<div className="ch-img">

<Image
src={image}
alt={title}
fill
priority
sizes="100vw"
/>

</div>

{/* OVERLAY */}

<div className="ch-overlay"/>

{/* BREADCRUMB */}

<div className="ch-breadcrumb">
Home / <span>{title}</span>
</div>

{/* CONTENT */}

<div className="ch-content">

<div className="ch-wrap">

<div className="ch-tag">
Collection
</div>

<h1 className="ch-title">
{title}
</h1>

<div className="ch-divider"/>

<p className="ch-sub">
{subtitle || "Premium handcrafted décor pieces designed by Indian artisans for global interior designers and luxury retail markets."}
</p>

</div>

</div>

{/* SCROLL */}

<div className="ch-scroll">

<div className="ch-line"/>

<span>Scroll</span>

</div>

</div>

</>
  );
}