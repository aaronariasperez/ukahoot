package ukahootapi;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class UserPlayerJSON {
	private String user_name;
	private String poll_id;
	private String apikey;
	
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getPoll_id() {
		return poll_id;
	}
	public void setPoll_id(String poll_id) {
		this.poll_id = poll_id;
	}
	
	public String getApikey() { return this.apikey; }
	public void setApikey(String apikey) { this.apikey = apikey; }
}
