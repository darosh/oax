# Screenshots: <%=screen%> / <%=theme%> <small>[<%=size[0]%> &times; <%=size[0]%>]</small>
<%screens.forEach(function(s){ %>
## <%=s.title%>

[![](<%=s.path%>)](<%=s.path%>)
<%})%>
