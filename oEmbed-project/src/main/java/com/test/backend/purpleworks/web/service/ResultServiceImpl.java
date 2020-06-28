package com.test.backend.purpleworks.web.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ResultServiceImpl implements IResultService{
    RestTemplate restTemplate = new RestTemplate();
    ObjectMapper mapper = new ObjectMapper();

    @Override
    public String getProvider(String inputUrl) {
        int startIndex = inputUrl.indexOf("www");
        int endIndex = 0;

        if (startIndex == -1) {
            startIndex = inputUrl.indexOf("//");
            startIndex += 2;
        } else {
            startIndex += 4;
        }

        for (int i = startIndex; i < inputUrl.length(); i++) {
            if (inputUrl.charAt(i) == '.') {
                endIndex = i;
                break;
            }
        }

        System.out.println("최종 = " + inputUrl.substring(startIndex, endIndex));

        return inputUrl.substring(startIndex, endIndex);
    }

    @Override
    public String getEndpointUrl(String provider, String inputUrl) throws IOException {
        String providersUrl = "https://oembed.com/providers.json";
        String providersJson = restTemplate.getForObject(providersUrl, String.class);
        TypeReference<List<HashMap<String,Object>>> typeRef = new TypeReference<List<HashMap<String,Object>>>(){};

        List<HashMap<String,Object>> providersList = mapper.readValue(providersJson, typeRef);
        String endpointUrl = "";

//        System.out.println("::providersJson::");
//        System.out.println(providersJson);
//        System.out.println("::proviersList::");
//        System.out.println(providersList);

        for (int i = 0; i < providersList.size(); i++) {
            String p_name = (String) providersList.get(i).get("provider_name");
            if (p_name.toLowerCase().equals(provider)) {
                //System.out.println(providersList.get(i));
                List<HashMap<String, String>> endpointsList =
                        (List<HashMap<String, String>>) providersList.get(i).get("endpoints");

                endpointUrl = endpointsList.get(0).get("url");
                break;
            }
        }
        return endpointUrl;
    }

    @Override
    public Map<String, String> getOEmbedInfo(String epUrl, String inputUrl) throws IOException {
        Map<String, String> params = new HashMap<>();
        params.put("url", inputUrl);
        params.put("format", "json");

        String oEmbedJson = restTemplate.getForObject(
                epUrl + "?url={url}" + "&format={format}",
                 String.class, params
        );

        TypeReference<HashMap<String, String>> typeRef = new TypeReference<HashMap<String, String>>(){};
        Map<String, String> oEmbedInfo = mapper.readValue(oEmbedJson, typeRef);

        return oEmbedInfo;
    }
}
