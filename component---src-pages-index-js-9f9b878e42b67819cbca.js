"use strict";(self.webpackChunkricca509_github_io=self.webpackChunkricca509_github_io||[]).push([[678],{2451:function(e,t,n){n.r(t),n.d(t,{default:function(){return C}});var r=n(7294),l=n(8167),a=n(4374),c=n(396);var o=["type","children"],i=Object.freeze({link:"a",button:"button"}),m=function(e){var t=e.type,n=void 0===t?i.link:t,l=e.children,a=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,o),c=i[n]||i.link;return r.createElement(c,Object.assign({},a,{className:"cta-module--button--B0OgN"}),l)};m.types=i;var u=m,s=function(e){var t=e.children,n=e.image;return r.createElement("section",{className:"about-me-module--container--6K3MZ"},r.createElement(c.G,{alt:"Me",className:"about-me-module--img--rm9KY",image:n}),r.createElement("article",{className:"about-me-module--content--l-ght",dangerouslySetInnerHTML:{__html:t}}),r.createElement("div",{className:"about-me-module--getCv--DIvuj"},r.createElement(u,{type:u.types.link,target:"_blank",rel:"noopener",href:"/riccardo-coppola-cv.pdf"},"Get my CV")))},d=function(e){var t=e.title,n=e.link,l=e.children;return r.createElement("li",null,r.createElement("em",null,n?r.createElement("a",{alt:t,href:n},t):{title:t}),r.createElement("div",{className:"side-project-module--description--S0Kqd",dangerouslySetInnerHTML:{__html:l}}))},p=function(e){var t=e.children;return r.createElement("h2",{className:"section-title-module--title--h3JEi"},t)},E=function(e){var t=e.sideProjectsList;return r.createElement(r.Fragment,null,r.createElement(p,null,"Side projects"),r.createElement("ul",{className:"side-projects-list-section-module--list--EByle"},t.map((function(e){var t=e.node;return r.createElement(d,{key:t.id,title:t.frontmatter.title,link:t.frontmatter.link},t.html)}))))},f=function(e){var t=e.children,n=e.renderTrigger,l=(0,r.useState)(!0),a=l[0],c=l[1];return r.createElement(r.Fragment,null,!a&&t,n({onClick:function(e){e.preventDefault(),c(!a)},isCollapsed:a}))},g="expand-button-module--arrow--p+-o7",h="expand-button-module--arrowDown--Ctdfy",v="expand-button-module--arrowUp--GbO+q",k=function(e){var t=e.onClick,n=e.isInCollapsedState;return r.createElement("button",{className:"expand-button-module--button--h5T86",onClick:t},n?r.createElement("div",{className:[g,h].join(" "),role:"img"}):r.createElement("div",{className:[g,v].join(" "),role:"img"}))},b=function(e){var t=e.company,n=e.role,l=e.fromDate,a=e.toDate,c=e.technologies,o=e.children,i=r.createElement(r.Fragment,null,c&&r.createElement("div",null,r.createElement("strong",null,"Key tools used:"),r.createElement("p",null,r.createElement("em",null,c.join(", ")))),r.createElement("div",{className:"work-experience-module--content--nFqlY",dangerouslySetInnerHTML:{__html:o}}));return r.createElement("article",{className:"work-experience-module--container--SGScv"},r.createElement("header",{className:"work-experience-module--head--ghGPI"},r.createElement("h3",{className:"work-experience-module--title--CvpzG"},t),r.createElement("p",null,r.createElement("strong",null,n)),r.createElement("p",{className:"work-experience-module--dates--lRbVk"},r.createElement("em",null,l+" - "+(a||"present")))),r.createElement("div",{className:"work-experience-module--printContent--UT6F3"},i),r.createElement("div",{className:"work-experience-module--screenContent--DoFwx"},r.createElement(f,{renderTrigger:function(e){var t=e.onClick,n=e.isCollapsed;return r.createElement("div",{className:"work-experience-module--expandSection--CPlvx"},r.createElement(k,{onClick:t,isInCollapsedState:n}))}},i)))},y=function(e){var t=e.experienceList;return r.createElement(r.Fragment,null,r.createElement(p,null,"Experience"),t.map((function(e){var t=e.node;return r.createElement(b,{key:t.id,company:t.frontmatter.company,role:t.frontmatter.role,fromDate:t.frontmatter.from_date,toDate:t.frontmatter.to_date,technologies:t.frontmatter.technologies},t.html)})))},x=function(e){var t=e.title,n=e.children;return r.createElement(r.Fragment,null,r.createElement(p,null,t),r.createElement("div",{dangerouslySetInnerHTML:{__html:n}}))},N=function(e){return e.sectionList.map((function(e){var t=e.node;return r.createElement(x,{key:t.id,title:t.frontmatter.title},t.html)}))},C=function(e){var t=e.data;return r.createElement(l.Z,null,r.createElement(a.Z,{title:"Profile"}),r.createElement(s,{image:t.file.childImageSharp.gatsbyImageData},t.about.html),r.createElement(y,{experienceList:t.experience.edges}),r.createElement(E,{sideProjectsList:t.sideProjects.edges}),r.createElement(N,{sectionList:t.otherSections.edges}))}}}]);
//# sourceMappingURL=component---src-pages-index-js-9f9b878e42b67819cbca.js.map