package ukahootapi;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.jose4j.jwk.JsonWebKey;
import org.jose4j.jwk.RsaJsonWebKey;
import org.jose4j.jwk.RsaJwkGenerator;
import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jws.JsonWebSignature;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.lang.JoseException;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;

@Path("/hello")
public class Ukahoot {
	private static Map<String, UserRegisteredJSON> userRegistered_map = new HashMap<String, UserRegisteredJSON>();
	private static Map<String, UserPlayerJSON> userPlayer_map= new HashMap<String, UserPlayerJSON>();
	private static Map<String, PollJSON> polls_map = new HashMap<String, PollJSON>();
	private static int polls_id = 0;
	private static Map<String, RankResponseJSON> ranks_map = new HashMap<String, RankResponseJSON>();
	
	static {
		UserRegisteredJSON user = new UserRegisteredJSON();//"creador", "creadorpass", "");
		user.setUser("creador");
		user.setPass("creadorpass");
	
		userRegistered_map.put(user.getUser(), user);
		
		//TODO: REMOVE THIS
		RankResponseJSON response = new RankResponseJSON();
		response.setPoll_name("poll de prueba");
		Rank r1 = new Rank("creator", 123);
		Rank r2 = new Rank("creator2", 1432);
		List<Rank> rs = new ArrayList<Rank>();
		rs.add(r1);
		rs.add(r2);
		response.setRanks(rs);
		ranks_map.put("0", response);
	}
	
	//*****APIKEY******
	

	@POST
	@Path("/lol")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String getApiKey(@HeaderParam("hello") String hello, UserPlayerJSON user) {
		/*if(!userPlayer_map.containsKey(myUser.getUser())) {
			UUID apikey = UUID.randomUUID();
			UserPlayerJSON newUser = new UserPlayerJSON(myUser.getUser(), apikey.toString());
			userPlayer_map.put(myUser.getUser(), newUser); 
			
			return apikey.toString();
		}
		return null;*/
		return user.getApikey();
	}
	
	@POST
	@Path("/apikey")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String getApiKey(UserPlayerJSON myUser) {
		if(!userPlayer_map.containsKey(myUser.getUser())) {
			UUID apikey = UUID.randomUUID();
			UserPlayerJSON newUser = new UserPlayerJSON();//myUser.getUser(), apikey.toString());
			newUser.setUser(myUser.getUser());
			newUser.setApikey(apikey.toString());
			userPlayer_map.put(newUser.getUser(), newUser); 
			
			return apikey.toString();
		}
		return null;
	}
	
	@POST
	@Path("/testApikey1")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String testing(UserPlayerJSON myUser) {
		if(userPlayer_map.get(myUser.getUser()).getApikey().equals(myUser.getApikey())) {
			return "GRANTED";
		}else {
			return "DENIED: ";
		}
	}
	
	//*****AUTH Y CREAR ENCUESTA*****
	

	@Path("/auth")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public MessageJSON auth(UserRegisteredJSON user_input) 
		throws JsonGenerationException, JsonMappingException, IOException{
		
		if(userRegistered_map.containsKey(user_input.getUser()) && userRegistered_map.get(user_input.getUser()).getPass().equals(user_input.getPass())){
			UserRegisteredJSON user = userRegistered_map.get(user_input.getUser());
			RsaJsonWebKey jwk = null;
			try {
				jwk= RsaJwkGenerator.generateJwk(2048); 
				jwk.setKeyId("1");
			} catch (JoseException e) {   
				e.printStackTrace();  
			}
			JwtClaims claims= new JwtClaims();
			claims.setIssuer("uca");
			claims.setExpirationTimeMinutesInTheFuture(10);
			claims.setGeneratedJwtId();
			claims.setIssuedAtToNow();
			claims.setNotBeforeMinutesInThePast(2);
			claims.setSubject(user_input.getUser());
			claims.setStringListClaim("roles", "basicRestUser"); 
			JsonWebSignature jws= new JsonWebSignature();
			jws.setPayload(claims.toJson());
			jws.setKeyIdHeaderValue(jwk.getKeyId());
			jws.setKey(jwk.getPrivateKey());
			jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.RSA_USING_SHA256); 
			String jwt= null;
			try {
				jwt = jws.getCompactSerialization();
			} catch (JoseException e) {
				System.out.println(e);
			}
			user.setJWK(jwk);
			MessageJSON msj = new MessageJSON();
			msj.setMessage("Token creado");
			msj.setToken(jwt);
			return msj;
		}else {
			return null;
		}
		
	}

	@POST 
	@Path("/encuesta")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public PollResponseJSON poll(PollJSON poll, @HeaderParam("token") String token, @HeaderParam("user") String user) 
		throws JsonGenerationException, JsonMappingException, IOException{
		
		JsonWebKey jwk = userRegistered_map.get(user).getJWK();
		JwtConsumer jwtConsumer = new JwtConsumerBuilder()
				.setRequireExpirationTime()
				.setAllowedClockSkewInSeconds(30)
				.setRequireSubject()
				.setExpectedIssuer("uca")
				.setVerificationKey(jwk.getKey()).build();
		try {
			JwtClaims jwtClaims = jwtConsumer.processToClaims(token);
			System.out.println("JWT validation succeeded! " + jwtClaims);
		}catch(InvalidJwtException e) {
			return null;
		}
		PollResponseJSON response = new PollResponseJSON();
		String generated = Integer.toString(polls_id);
		polls_id++;
		poll.setPoll_id(generated);
		polls_map.put(generated, poll);
		response.setPoll_id(generated);
		return response;
	}

	//*****RANKING*****
	
	@GET
	@Path("/ranking/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public RankResponseJSON ranking(@PathParam("id") String id) {
		System.out.println("hello");
		return ranks_map.get(id);
	}
	
}
