 &nbsp;|<%= Object.keys(tools).join('|') %>
:---:|<%= Object.keys(tools).map(()=>':---:').join('|') %>
<% tests.forEach((v, i) => { %>|<%=v.title%><% Object.keys(tools).forEach((tool)=>{%>|[<%=tool%>]()<%})%>|
<% }) %>
