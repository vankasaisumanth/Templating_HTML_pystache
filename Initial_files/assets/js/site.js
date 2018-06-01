// SITE js
var SITE = {
	isMobile : function(){	
		//var uagent = navigator.userAgent.toLowerCase();
		//if (uagent.search("iphone") > -1 || uagent.search("ipod") > -1){
		if( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ) {
			return true;
		}else{
			return false;
		}
	},
	//Tablet Condition
	isTablet : function(){	
		var uagent = navigator.userAgent.toLowerCase();
		//if (uagent.search("iphone") > -1 || uagent.search("ipod") > -1){
		if( /Android|iPad/i.test(navigator.userAgent) ) {
			return true;
		}else{
			return false;
		}
	},
	
	toTop:function(){
		jQuery('html, body').animate( { scrollTop: 0 }, 'slow' );
	},
	
	scrollToSection:function(){
		try{
			var hash = window.location.hash;
			if(hash && hash.length > 0){
				jQuery('html,body').animate({scrollTop:jQuery(hash).offset().top-0}, 'slow');
			}
			
			jQuery(".menu-item > .sub-menu > .menu-item > .sub-menu > li").on("click","a",function(event){		
				//event.preventDefault();
				var hash = this.hash; 
				jQuery('html,body').animate({scrollTop:jQuery(hash).offset().top-0}, 'slow');			
			});
			
			jQuery("a[href='#']").on("click",function(event){		
				event.preventDefault();
			});
		}catch(err) {
			//err.message;
			return false;
		}
		
	},
	
	initMobileMenu: function(){
		//	The menu on the left
		jQuery('#mobile_menu').mmenu({
			selectedClass  : "current_page_item"
		});
	},	
	 	
	//Show Form Error
	showErrorBox: function(error){
		var errorbox = '<div id="error-messages" class="error-popup mfp-hide"> <h2>Oops!</h2><ul id="error-list"></ul></div>';
		if(jQuery("#error-messages").size() == 0){
			jQuery(errorbox).appendTo("body");
		}
		jQuery("#error-list").empty().append(error);
		jQuery.magnificPopup.open({
		  items: {src: '#error-messages'},
		  type: 'inline'
		}, 0);
		return false;
	},
	


	toTitleCase: function(str) {
		 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	},	
	
	equalHeight: function(el){
		if(jQuery(el).size() > 0){
			var byRow = true;
			jQuery(el).matchHeight(byRow);
		}
	},
	

	initTabs: function(){
		jQuery(".tabs").on("click","a",function(event) {
            event.preventDefault();
            jQuery(this).parent().addClass("active");
            jQuery(this).parent().siblings().removeClass("active");
            var tab = jQuery(this).attr("href");
            jQuery(".tab-content").hide();
            jQuery(tab).show();
        });

        //jQuery(".tabs a:eq(0)").click();
	},

	initSlider: function(slider,numSlides, mSlides){
		var slideOptions = {}
		if(numSlides == 1){
			slideOptions = {
				autoplay:true,
				speed:200,
				nextArrow:'<button type="button" class="slick-next icon-right"></button>',
				prevArrow:'<button type="button" class="slick-prev"><span class="icon-left"></span></button>'
			}
		}else if(numSlides == 3){
			if(SITE.isMobile()){
				mSlides = 300;
			}
			slideOptions = {
                dots: true,
				lazyLoad: 'ondemand',
                centerMode: true,
				slidesToShow: mSlides,
				slidesToScroll: 1,
				centerPadding:'15px',
                arrows:true,
				adaptiveHeight: true,
				speed:200,
				autoplay:true,
				 responsive: [
				    {
				    	breakpoint: 1024,
						settings: {
							arrows: false,
							slidesToShow: 2
						}
				    },
				    	{
						breakpoint: 768,
						settings: {
							arrows: false,
							slidesToShow: 3
						}
				    },
				    {
						breakpoint: 480,
						settings: {
							arrows: false,
							slidesToShow: 1
						}
				    }
			    ]
			}
		}else if(numSlides == 4){
			var slide_width = 300;
			if(SITE.isMobile()){
				slide_width = 340;
			}
			slideOptions = {
				lazyLoad: 'ondemand',
				autoplay:true,
				speed:700,
				fade: true,
				adaptiveHeight: true,
				pauseOnHover: false
			}
		}			
		jQuery(slider).slick(slideOptions).css({'visibility':'visible','overflow':'inherit','max-height':'inherit'});	
	},

	stickyHeader: function(){
		
			if(jQuery(window).scrollTop() >= 100){
			    jQuery('.site-header').addClass('sticky-header').css('opacity', '1');			    
			} else{
				jQuery('.site-header').removeClass('sticky-header').css('opacity', '1');
			}
		} 
	
};
     

//---------------------------------------------
jQuery(window).load(function() {	
	//equal div height on image load
	if(jQuery('.eq-parent .eq-child').size() > 0){
		jQuery('.eq-parent .eq-child').waitForImages( function() {
			SITE.equalHeight(".eq-parent .eq-child");
		});
	}
	
	if(typeof FastClick !== 'undefined') {      
      if (typeof document.body !== 'undefined') {
        FastClick.attach(document.body);
      }
    }

	SITE.initMobileMenu();
	
	if(jQuery(".three_slide_slider").size() > 0){
		SITE.initSlider('.three_slide_slider', 3, 3);

	}

	if(jQuery(".four_slide_slider").size() > 0){
		SITE.initSlider('.four_slide_slider', 3, 4);
	}

	if(jQuery("#project_detail_banner").size() > 0){
		SITE.initSlider('#project_detail_banner',4);
	}

	if(jQuery("#home_banner").size() > 0){
		SITE.initSlider('#home_banner',4);
	}
	if(jQuery("#home_banner-1").size() > 0){
		SITE.initSlider('#home_banner-1',4);
	}
	if(jQuery(".room_banner").size() > 0){
		SITE.initSlider('.room_banner',4);
	}
	SITE.scrollToSection();

	// datepicker

	if(jQuery("#dt1").size() > 0){
		jQuery('#dt1').Zebra_DatePicker({
	             direction: true,
	             format: 'd M, Y',
					
	             pair: jQuery('#dt2')
	         });
	};
       
	   if(jQuery("#dt2").size() > 0){   
	     jQuery('#dt2').Zebra_DatePicker({
	         direction: 1,
	         format: 'd M, Y',
				
	     });
	 };
    SITE.initTabs();
	//jQuery('#frm_calculator_construction_loan').parsley();
	
	jQuery('.popup-gallery, .popup-gallery-1, .popup-gallery-2').magnificPopup({
		delegate: 'a.gthumb',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		}
	});
	
	jQuery('.popup-content-gallery').magnificPopup({
		delegate: 'a.popup-content',
		type: 'inline',
		tLoading: 'Loading content #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		callbacks: {
		    buildControls: function() {
		      // re-appends controls inside the main container
		      this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
		    }
		}

		//prependTo: '#section_capitalvalues .popup-content-gallery'
	});
	
	jQuery('.popup-youtube').magnificPopup({         
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false
	});
	
	jQuery('.popup-iframe').magnificPopup({         
	  type: 'iframe',
	  mainClass: 'mfp-fade',
	  removalDelay: 160,
	  preloader: false
	 });
 
	jQuery('.popup-inline').magnificPopup({
          type: 'inline',
          preloader: false
	});	
	
	jQuery('.popup-modal').magnificPopup({
		type: 'inline',
		preloader: false,
		modal: true
	});
	
	jQuery(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		jQuery.magnificPopup.close();
	});
	
	jQuery('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: true,
		mainClass: 'mfp-fade',
		image: {
			verticalFit: true
		}
	});
	
	if(jQuery("iframe").size() > 0 && jQuery(".iframe_video").size() > 0){
		fluidvids.init({
		  selector: ['.iframe_video'], // runs querySelectorAll()
		  players: ['www.youtube.com', 'player.vimeo.com'] // players to support
		});
	}

	
});

//START: Add title on buttons
jQuery('a.cta').each(function(){
    jQuery(this).attr('title',''+jQuery(this).text());
});
jQuery('button').each(function(){
    jQuery(this).attr('title',''+jQuery(this).text());
});
jQuery('input[type="submit"],input[type="button"]').each(function(){
    jQuery(this).attr('title',''+jQuery(this).val());
});
//END: Add title on buttons


//START: back to top
jQuery(document).ready(function() {
  jQuery(window).scroll(function() {
    if (jQuery(this).scrollTop() > 100) {
      jQuery('.scrollup').fadeIn();
    } else {
      jQuery('.scrollup').fadeOut();
    }
  });
  jQuery('.scrollup').click(function() {
    jQuery("html, body").animate({scrollTop: 0}, 600);
    return false;
  });
});
//END: back to top //

// Resize header div's height
jQuery( window ).on( 'debouncedresize', function() {
	jQuery.fn.matchHeight._update();
	jQuery.fn.matchHeight._maintainScroll = true;		
	var mobile_menu_api = jQuery("#mobile_menu").data( "mmenu" );
	mobile_menu_api.close();   
	//SITE.stickyHeader();   
});

//sticky Header var
var iScrollPos = 0;
jQuery(window).scroll(function() {
	//SITE.stickyHeader();
});

