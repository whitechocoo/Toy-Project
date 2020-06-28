package com.test.backend.purpleworks.web.controller;

import com.test.backend.purpleworks.web.service.IResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.*;
import java.io.IOException;

@Controller
public class IndexController {
    @Autowired
    private IResultService resultService;

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @PostMapping("/result")
    public String result(@RequestParam("inputUrl") String inputUrl, Model model) throws IOException {
        String provider = resultService.getProvider(inputUrl);
        String epUrl = resultService.getEndpointUrl(provider, inputUrl);
        Map<String, String> oEmbedInfo = resultService.getOEmbedInfo(epUrl, inputUrl);

        model.addAttribute("oEmbedInfo", oEmbedInfo);

        return "index";
    }
}
