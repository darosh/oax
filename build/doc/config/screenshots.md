# <%=screen%>-<%=theme%> <small><%=size[0]%>&times;<%=size[1]%></small>
<%screens.forEach(function(s){ %>
## <%=s.title%>

[![](<%=s.path%>)](<%=s.path%>)
<%})%>
