package ukahootapi;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class EnviarEncuestaJSON {
	private String poll_id;
	private List<Integer> answers;
	private String apikey;
	private String user_name;
	
	public String getPoll_id() {
		return poll_id;
	}
	public void setPoll_id(String poll_id) {
		this.poll_id = poll_id;
	}
	public List<Integer> getAnswers() {
		return answers;
	}
	public void setAnswers(List<Integer> answers) {
		this.answers = answers;
	}
	public String getApikey() {
		return apikey;
	}
	public void setApikey(String apikey) {
		this.apikey = apikey;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	
	
}
