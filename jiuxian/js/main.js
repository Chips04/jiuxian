function changeOn(){
	$(".more-tr").mouseenter(function(){
		$(this).addClass("on");
	})
	$(".more-tr").mouseleave(function(){
		$(this).removeClass("on");
	})
	$(".tr-6").mouseenter(function(){
		$(".tr-6-hide").css("display","block");
	})
	$(".tr-6").mouseleave(function(){
		$(".tr-6-hide").css("display","none");
	})
	$(".left-box-item").mouseenter(function(){
		$(this).addClass("on");
	})
	$(".left-box-item").mouseleave(function(){
		$(this).removeClass("on");
	})
}
function addTopImg(){
	$.getJSON("json/main.json",function(data){
		//console.log("url("+data["top-ad"]["url"]+")")
		$("#top-ad a").css("background","url("+data["top-ad"].url+") no-repeat top center scroll");
	})
}
function addHeaderLogoAd(){
	$.get("json/main.json",null,function(data){
		$(".header-logo-ad img").attr("src",data["header-logo-ad"].url);
	},"json")
	/*$.getJSON("json/main.json",function(data){
		//console.log(data["header-logo-ad"]["url"])
		$(".header-logo-ad img").attr("src",data["header-logo-ad"].url);
	})*/
}
function addLeftBoxContent(){
	$.getJSON("json/left-box-content.json",null,function(data){
		$.each(data,function(p,item){
			$("#"+p+" .left-box-content h3").append("<a href=\""+data[p]["url"]+"\" target=\"_blank\">"+data[p]["pathname"]+"</a>");
			//加a标签
			$("#"+p+" .left-box-content .left-box-content-div").append("<p></p>");
			//加第一个p标签
			$.each(data[p]["p1"],function(j,jtem){
				if(data[p]["p1"][j]["class"]){
					$("#"+p+" .left-box-content .left-box-content-div p").append("<a href=\""+data[p]["p1"][j]["href"]+"\" target=\"_blank\""+"class=\"on\""+">"+data[p]["p1"][j]["html"]+"</a>");
					//加p里面的a标签
				}else{
					$("#"+p+" .left-box-content .left-box-content-div p").append("<a href=\""+data[p]["p1"][j]["href"]+"\" target=\"_blank\">"+data[p]["p1"][j]["html"]+"</a>");
				}
			})
			if(data[p]["p2"]){
				$("#"+p+" .left-box-content .left-box-content-div").append("<p></p>");
				$.each(data[p]["p1"],function(k,ktem){
				if(data[p]["p1"][k]["class"]){
					$("#"+p+" .left-box-content .left-box-content-div p").append("<a href=\""+data[p]["p1"][k]["href"]+"\" target=\"_blank\""+"class=\"on\""+">"+data[p]["p1"][k]["html"]+"</a>");
				}else{
					$("#"+p+" .left-box-content .left-box-content-div p").append("<a href=\""+data[p]["p1"][k]["href"]+"\" target=\"_blank\">"+data[p]["p1"][k]["html"]+"</a>");
				}
			})
			}
			//如果有，加第二个p标签
		})
	})
}
function addNavAd(){
	$.getJSON("json/main.json",function(data){
		//console.log("url("+data["top-ad"]["url"]+")")
		$(".nav-ad a img").attr("src",data["nav-ad"].url);
	})
}
function addBannerLi(){
	var n=0;
	var m=0;
	var r=0;
	$.getJSON("json/main.json",function(data){
		//console.log("url("+data["top-ad"]["url"]+")")
		$.each(data["big-ul"], function(l,ltem) {
			$(".big-ul").append("<li><div class='banner-right'><a class='focus-area'></a><div class='mav'><a></a><span class='mask1'></span><a></a><span class='mask2'></span><a></a><span class='mask3'></span></div></div></li>");
			m++;
			$(".small-ul").append("<li>"+m+"</li>");
		});
		$(".small-ul li:first-child").addClass("on");
		$.each(data["big-ul"],function(j,jtem){
			n++;
			r=0;
			$(".big-ul li:nth-of-type("+n+")").css("background","url("+jtem.url+") center 0px no-repeat");
			$(".big-ul li:nth-of-type("+n+") .focus-area").attr({href:jtem.href,target:"_blank"});
			$.each(jtem["mav-a"],function(q,qtem){
				//console.log(qtem)
				r++;
				$(".big-ul li:nth-of-type("+n+") .mav a:nth-of-type("+r+")").css("background","url("+qtem.url+") no-repeat");
				$(".big-ul li:nth-of-type("+n+") .mav a:nth-of-type("+r+")").attr("href",qtem.href);
			})
		})
		$(".mav span").css("display","none");
		$(".mav a").hover(function(){
			$(this).next().css("display","inline-block");
		},function(){
			$(this).next().css("display","none");
		})
		bannerMove();
	})
}
function bannerMove(){
	var i=0;
	var _timer=0;
	var _timer2=0;
	function delay(){
		$(".small-ul li").eq(i).removeClass("on");
		i++;
		if(i>=$(".big-ul li").size()){
			i=0;
		}
		$(".big-ul li").eq(i).css("display","block");
		$(".small-ul li").eq(i).addClass("on");
		player(true);
	}
	function player(_cmd){
		$(".small-ul li").eq(i).addClass("on");
		if(i==0){
			$(".big-ul li").eq(i).animate({
				"opacity":1,
			},1000,function(){
				if(_cmd){
					window.clearTimeout(_timer);
					_timer=window.setTimeout(delay,2000);
				}else{
					$(".big-ul li").eq(i).stop();
					window.clearTimeout(_timer);
				}
			});
		}else{
			$(".big-ul li").eq(i).animate({
				"opacity":1,
			},1000);
			$(".big-ul li").eq(i-1).animate({
				"opacity":0,
			},1000,function(){
				if(_cmd){
					window.clearTimeout(_timer);
					_timer=window.setTimeout(delay,2000);
				}else{
					$(".big-ul li").eq(i-1).stop();
					window.clearTimeout(_timer);
				}
			});
		}
	}
	function eventHandle(_current){
		$(".big-ul li").eq(i).finish();
		if(i>1){
			$(".big-ul li").eq(i-1).finish();
		}
		$(".big-ul li").css({
			"display":"none"
		});
		$(".small-ul li").removeClass("on");
		$(_current).addClass("on");
		i=$(_current).index();
		$(".big-ul li").eq(i).css({
			"display":"block"
		});
		window.clearTimeout(_timer);
		player(false);
	}
	player(true);
	$(".main-banner").mouseenter(function(){
		$(".big-ul li").eq(i).finish();
		if(i>1){
			$(".big-ul li").eq(i-1).finish();
		}
		window.clearTimeout(_timer);
		//window.clearTimeout(_timer2);
		
	});
	$(".main-banner").mouseleave(function(){
		player(true);
	});
	$(".small-ul li").mouseenter(function(){
		eventHandle(this);
	});
}
$(function(){
	changeOn();
	addTopImg();
	addHeaderLogoAd();
	addLeftBoxContent();
	addNavAd();
	addBannerLi();
})