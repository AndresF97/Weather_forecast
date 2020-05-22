# Weather_forecast

## Site Picture
![Weathe Website](https://media.licdn.com/dms/image/C4D22AQE6bJkfKRdBvg/feedshare-shrink_800/0?e=1579132800&v=beta&t=IVH7QADnVG6r14xga9GglyQAKmJEru-T1uRPQ8fVvzg)

## Summary 
- You can use this website to look up the weather of any city,state and country; after the user searches for the place they want to look up it will be saved in their local storage. That way they have a way to see their search history. Once they refresh the page and search for a new city the history will then be erased automatically. 

## Technologies Used
- HTML - used to create elements on the DOM
- CSS - styles html elements on page
- Bootstrap - Used to create cosmitics of the website and Media inquries
- Jquery - to create the edits in the website
- Weather API - to get needed information for the weather
- Ajax - to pull information from 
- Fontawesome - made icons in html
- Git - version control system to track changes to source code
- GitHub - hosts repository that can be deployed to GitHub Pages



## Code Snippet
```html
<html>
<body>
    <script>
     function index(lat,lon){
    var jurl= "http://api.openweathermap.org/data/2.5/uvi/forecast?appid="+key+"&lat="+lat+"&lon="+lon;
    $.ajax({
        url:jurl,
        method:"GET"
    }).then(function(info){
        var num = info[0].value;
        if(num  < 5){
            uv.addClass("btn btn-success");
        }
        if (num ===7){
            uv.addClass("btn btn-warning")
        }
        if(num > 7){
            uv.addClass("btn btn-danger")
        }
        uv.text("UV index ="+num)
    })


}

    </script>
</body>
</html>
```
## Code Explained: 
- Since the website is focused on the weather most people usually look at weather websites to see if they need protection from the elements. I though that it might be a good idea to create a background for the UV index since there's alot people that worry about there skin and exposure to UV-rays. depending on the UV value the box changes color.
## Author Links
- [LinkedIn](linkedin.com/in/andres-felipe-jimenez-ferreira-b67a35192)
- [GitHub](https://github.com/AndresF97)