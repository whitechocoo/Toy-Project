package com.test.backend.purpleworks.web.service;

import java.io.IOException;
import java.util.Map;

public interface IResultService {
    public String getProvider(String inputUrl);
    public String getEndpointUrl(String provider, String inputUrl) throws IOException;
    public Map<String, String>  getOEmbedInfo(String epUrl, String inputUrl) throws IOException;
}
