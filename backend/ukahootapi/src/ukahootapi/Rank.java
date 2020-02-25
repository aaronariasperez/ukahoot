package ukahootapi;

public class Rank {
	private String user_name;
	private int score;
	
	public Rank(String user_name, int score) {
		super();
		this.user_name = user_name;
		this.score = score;
	}
	
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
}
