package ukahootapi;

import javax.xml.bind.annotation.XmlRootElement;

import org.jose4j.jwk.JsonWebKey;

@XmlRootElement
public class UserRegisteredJSON {
	private String user;
	private String pass;
	private JsonWebKey jwk;
	
	public String getUser() { return this.user; }
	public void setUser(String usr) { this.user = usr; }
	
	public String getPass() { return this.pass; }
	public void setPass(String pwd) { this.pass = pwd; }
	
	public JsonWebKey getJWK() { return this.jwk; }
	public void setJWK(JsonWebKey jwk) { this.jwk = jwk; }
	
}
