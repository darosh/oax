 &nbsp;| &nbsp;|<%= Object.keys(tools).join('|') %>|&nbsp;
---:|:---|<%= Object.keys(tools).map(()=>':---:').join('|') %>|:---
<% tests.forEach((v, i) => { %>|<%=i+1%>|<%=v.title%><% Object.keys(tools).forEach((tool,j)=>{%>|[<%='ABCDEFGH'[j]%><%=i+1%>](<%=tools[tool]+v.url%>)<%})%>|<%=v.note%>|
<% }) %>
