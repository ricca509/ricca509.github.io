"use strict";(self.webpackChunkricca509_github_io=self.webpackChunkricca509_github_io||[]).push([[970],{7290:function(e,t,l){l.r(t),l.d(t,{default:function(){return x}});var n=l(6540),r=l(2202),a=l(5289),o=l(3968);var c=e=>{let{type:t="a",children:l,...r}=e;const a=t;return n.createElement(a,Object.assign({},r,{className:"Cta-module--button--9a4d1"}),l)};const m=e=>{let{children:t,image:l}=e;return n.createElement("section",{className:"AboutMe-module--container--0b8d7"},n.createElement(o.G,{alt:"Me",className:"AboutMe-module--img--eafcb",image:l}),n.createElement("article",{className:"AboutMe-module--content--757f4",dangerouslySetInnerHTML:{__html:t}}),n.createElement("div",{className:"AboutMe-module--getCv--54b78"},n.createElement(c,{type:"a",target:"_blank",rel:"noopener",href:"/riccardo-coppola-cv.pdf"},"Get my CV")))};const i=e=>{let{title:t,link:l,children:r}=e;return n.createElement("li",null,n.createElement("em",null,l?n.createElement("a",{"aria-label":t,href:l},t):{title:t}),n.createElement("div",{className:"SideProject-module--description--d9cf2",dangerouslySetInnerHTML:{__html:r}}))};const d=e=>{let{children:t}=e;return n.createElement("h2",{className:"SectionTitle-module--title--90872"},t)};var u=d;const s=e=>{let{sideProjectsList:t}=e;return n.createElement(n.Fragment,null,n.createElement(d,null,"Side projects"),n.createElement("ul",{className:"SideProjectsListSection-module--list--94ae0"},t.map((e=>{var t,l;let{node:r}=e;return n.createElement(i,{key:r.id,title:(null==r||null===(t=r.frontmatter)||void 0===t?void 0:t.title)||"",link:(null==r||null===(l=r.frontmatter)||void 0===l?void 0:l.link)||"#"},r.html)}))))};const E=e=>{let{children:t,renderTrigger:l}=e;const{0:r,1:a}=(0,n.useState)(!0);return n.createElement(n.Fragment,null,!r&&t,l({onClick:e=>{e.preventDefault(),a(!r)},isCollapsed:r}))};var p="ExpandButton-module--arrow--04ad0",v="ExpandButton-module--arrowDown--41c3b",g="ExpandButton-module--arrowUp--87bd9";const h=e=>{let{onClick:t,isInCollapsedState:l}=e;return n.createElement("button",{className:"ExpandButton-module--button--31ba9",onClick:t},l?n.createElement("div",{className:[p,v].join(" "),role:"img"}):n.createElement("div",{className:[p,g].join(" "),role:"img"}))};const f=e=>{let{company:t,role:l,fromDate:r,toDate:a,technologies:o,children:c}=e;const m=n.createElement(n.Fragment,null,o&&n.createElement("div",null,n.createElement("strong",null,"Key tools used:"),n.createElement("p",null,n.createElement("em",null,o.join(", ")))),n.createElement("div",{className:"WorkExperience-module--content--44c78",dangerouslySetInnerHTML:{__html:c}}));return n.createElement("article",{className:"WorkExperience-module--container--8468d"},n.createElement("header",{className:"WorkExperience-module--head--36902"},n.createElement("h3",{className:"WorkExperience-module--title--fb40f"},t),n.createElement("p",null,n.createElement("strong",null,l)),n.createElement("p",{className:"WorkExperience-module--dates--91d9a"},n.createElement("em",null,`${r} - ${a||"present"}`))),n.createElement("div",{className:"WorkExperience-module--printContent--30254"},m),n.createElement("div",{className:"WorkExperience-module--screenContent--e2c21"},n.createElement(E,{renderTrigger:e=>{let{onClick:t,isCollapsed:l}=e;return n.createElement("div",{className:"WorkExperience-module--expandSection--8a91c"},n.createElement(h,{onClick:t,isInCollapsedState:l}))}},m)))};const b=e=>{let{experienceList:t}=e;return n.createElement(n.Fragment,null,n.createElement(d,null,"Experience"),t.map((e=>{var t,l,r,a,o;let{node:c}=e;return n.createElement(f,{key:c.id,company:null==c||null===(t=c.frontmatter)||void 0===t?void 0:t.company,role:null==c||null===(l=c.frontmatter)||void 0===l?void 0:l.role,fromDate:null==c||null===(r=c.frontmatter)||void 0===r?void 0:r.from_date,toDate:null==c||null===(a=c.frontmatter)||void 0===a?void 0:a.to_date,technologies:null==c||null===(o=c.frontmatter)||void 0===o?void 0:o.technologies},c.html)})))};const k=e=>{let{title:t,children:l}=e;return n.createElement(n.Fragment,null,n.createElement(u,null,t),n.createElement("div",{dangerouslySetInnerHTML:{__html:l}}))};const N=e=>{let{sectionList:t}=e;return n.createElement(n.Fragment,null,t.map((e=>{var t;let{node:l}=e;return n.createElement(k,{key:l.id,title:(null==l||null===(t=l.frontmatter)||void 0===t?void 0:t.title)||""},l.html)})))};var x=e=>{var t,l,o;let{data:c}=e;return n.createElement(r.P,null,n.createElement(a.G,{title:"About me"}),n.createElement(m,{image:null==c||null===(t=c.file)||void 0===t||null===(l=t.childImageSharp)||void 0===l?void 0:l.gatsbyImageData},null==c||null===(o=c.about)||void 0===o?void 0:o.html),n.createElement(b,{experienceList:c.experience.edges}),n.createElement(s,{sideProjectsList:c.sideProjects.edges}),n.createElement(N,{sectionList:c.otherSections.edges}))}}}]);
//# sourceMappingURL=component---src-pages-about-tsx-7f1dad7db9ecb3d629d0.js.map