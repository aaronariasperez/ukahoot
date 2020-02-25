package ukahootapi;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CorsFilter implements Filter {

	@Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
       
    	 ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Origin", "http://localhost:8081");
         ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Methods", " POST, GET, PUT, OPTIONS, DELETE");
         ((HttpServletResponse) servletResponse).addHeader("Access-Control-Max-Age", "3600");
         ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, token, user");
         ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Credentials", "true");
         
         
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        System.out.println("CORSFilter HTTP Request: " + request.getMethod()); 
        HttpServletResponse resp = (HttpServletResponse) servletResponse;
        if (request.getMethod().equals("OPTIONS")) {
            resp.setStatus(HttpServletResponse.SC_ACCEPTED);
            return;
        }
        chain.doFilter(request, servletResponse);
    }
}

/*
@Provider
public class CorsFilter implements Filter {
 
    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
          responseContext.getHeaders().add(
            "Access-Control-Allow-Origin", "http://localhost");
          responseContext.getHeaders().add(
            "Access-Control-Allow-Credentials", "true");
          responseContext.getHeaders().add(
           "Access-Control-Allow-Headers",
           "Content-Type, Authorization, X-Requested-With");
          responseContext.getHeaders().add(
            "Access-Control-Allow-Methods", 
            "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    }
}
*/