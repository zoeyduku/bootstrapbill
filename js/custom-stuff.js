 /*!
 * Custom CSS Stuff
 * Zoey-DuCoeur
 * zoeyducoeur@gmail.com
 */
 // STUFF
 
 
 
 
 
/*! POPOVERS JQUERY START
 */
$(document).ready(function(){
    $('[data-toggle="popover"]').popover(); 
});
</script><!--Enable Popovers-->
 /*! POPOVERS JQUERY END
 */
 
 
 /*! ACCORDION JQUERY START
 */
 $(document).ready(function($) {
    $('#accordion').find('.accordion-toggle').click(function(){

      //Expand or collapse this panel
      $(this).next().slideToggle('fast');

      //Hide the other panels
      $(".accordion-content").not($(this).next()).slideUp('fast');

    });
  });
 /*! ACCORDION JQUERY END
 */
 
 
 

 
 

 
  // Contact form code

    $('form.form-email').submit(function(e) {
       
        // return false so form submits through jQuery rather than reloading page.
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;

        var thisForm = $(this).closest('form.form-email'),
            error = 0,
            originalError = thisForm.attr('original-error'),
            loadingSpinner, iFrame, userEmail, userFullName, userFirstName, userLastName, successRedirect;

		// Mailchimp/Campaign Monitor Mail List Form Scripts
		iFrame = $(thisForm).find('iframe.mail-list-form');
		
        thisForm.find('.form-error, .form-success').remove();
        thisForm.append('<div class="form-error" style="display: none;">' + thisForm.attr('data-error') + '</div>');
        thisForm.append('<div class="form-success" style="display: none;">' + thisForm.attr('data-success') + '</div>');


		if( (iFrame.length) && (typeof iFrame.attr('srcdoc') !== "undefined") && (iFrame.attr('srcdoc') !== "") ){
				
			console.log('Mail list form signup detected.');
            userEmail = $(thisForm).find('.signup-email-field').val();
            userFullName = $(thisForm).find('.signup-name-field').val();
            if ($(thisForm).find('input.signup-first-name-field').length) {
                userFirstName = $(thisForm).find('input.signup-first-name-field').val();
            } else {
                userFirstName = $(thisForm).find('.signup-name-field').val();
            }
            userLastName = $(thisForm).find('.signup-last-name-field').val();

			// validateFields returns 1 on error;
			if (validateFields(thisForm) !== 1) {
				console.log('Mail list signup form validation passed.');
				console.log(userEmail);
				console.log(userLastName);
				console.log(userFirstName);
				console.log(userFullName);
				
				iFrame.contents().find('#mce-EMAIL, #fieldEmail').val(userEmail);
				iFrame.contents().find('#mce-LNAME, #fieldLastName').val(userLastName);
				iFrame.contents().find('#mce-FNAME, #fieldFirstName').val(userFirstName);
				iFrame.contents().find('#mce-NAME, #fieldName').val(userFullName);
				iFrame.contents().find('form').attr('target', '_blank').submit();
                successRedirect = thisForm.attr('success-redirect');
                // For some browsers, if empty `successRedirect` is undefined; for others,
                // `successRedirect` is false.  Check for both.
                if (typeof successRedirect !== typeof undefined && successRedirect !== false && successRedirect !== "") {
                    window.location = successRedirect;
                }
			}else {
                thisForm.find('.form-error').fadeIn(1000);
                setTimeout(function() {
                    thisForm.find('.form-error').fadeOut(500);
                }, 5000);
            }
		} else {
			console.log('Send email form detected.');
			if (typeof originalError !== typeof undefined && originalError !== false) {
				thisForm.find('.form-error').text(originalError);
			}


			error = validateFields(thisForm);


			if (error === 1) {
				$(this).closest('form').find('.form-error').fadeIn(200);
				setTimeout(function() {
					$(thisForm).find('.form-error').fadeOut(500);
				}, 3000);
			} else {
				// Hide the error if one was shown
				$(this).closest('form').find('.form-error').fadeOut(200);
				// Create a new loading spinner while hiding the submit button.
				loadingSpinner = jQuery('<div />').addClass('form-loading').insertAfter($(thisForm).find('input[type="submit"]'));
				$(thisForm).find('input[type="submit"]').hide();

				jQuery.ajax({
					type: "POST",
					url: "mail/mail.php",
					data: thisForm.serialize(),
					success: function(response) {
						// Swiftmailer always sends back a number representing number of emails sent.
						// If this is numeric (not Swift Mailer error text) AND greater than 0 then show success message.
						$(thisForm).find('.form-loading').remove();

                        successRedirect = thisForm.attr('success-redirect');
                        // For some browsers, if empty `successRedirect` is undefined; for others,
                        // `successRedirect` is false.  Check for both.
                        if (typeof successRedirect !== typeof undefined && successRedirect !== false && successRedirect !== "") {
                            window.location = successRedirect;
                        }

						$(thisForm).find('input[type="submit"]').show();
						if ($.isNumeric(response)) {
							if (parseInt(response) > 0) {
								thisForm.find('input[type="text"]').val("");
                                thisForm.find('textarea').val("");
                                thisForm.find('.form-success').fadeIn(1000);
								
                                thisForm.find('.form-error').fadeOut(1000);
								setTimeout(function() {
									thisForm.find('.form-success').fadeOut(500);
								}, 5000);
							}
						}
						// If error text was returned, put the text in the .form-error div and show it.
						else {
							// Keep the current error text in a data attribute on the form
							thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
							// Show the error with the returned error text.
							thisForm.find('.form-error').text(response).fadeIn(1000);
							thisForm.find('.form-success').fadeOut(1000);
						}
					},
					error: function(errorObject, errorText, errorHTTP) {
						// Keep the current error text in a data attribute on the form
						thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
						// Show the error with the returned error text.
						thisForm.find('.form-error').text(errorHTTP).fadeIn(1000);
						thisForm.find('.form-success').fadeOut(1000);
						$(thisForm).find('.form-loading').remove();
						$(thisForm).find('input[type="submit"]').show();
					}
				});
			}
		}
		return false;
    });

    // End Contact Form Code

    // Get referrer from URL string 
    if (getURLParameter("ref")) {
        $('form.form-email').append('<input type="text" name="referrer" class="hidden" value="' + getURLParameter("ref") + '"/>');
    }

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

   

    $('.validate-required, .validate-email').on('blur change', function() {
        validateFields($(this).closest('form'));
    });

    $('form').each(function() {
        if ($(this).find('.form-error').length) {
            $(this).attr('original-error', $(this).find('.form-error').text());
        }
    });

    function validateFields(form) {
        var name, error, originalErrorMessage;

        $(form).find('.validate-required[type="checkbox"]').each(function() {
            if (!$('[name="' + $(this).attr('name') + '"]:checked').length) {
                error = 1;
                name = $(this).attr('name').replace('[]', '');
                form.find('.form-error').text('Please tick at least one ' + name + ' box.');
            }
        });

        $(form).find('.validate-required').each(function() {
            if ($(this).val() === '') {
                $(this).addClass('field-error');
                error = 1;
            } else {
                $(this).removeClass('field-error');
            }
        });

        $(form).find('.validate-email').each(function() {
            if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                $(this).addClass('field-error');
                error = 1;
            } else {
                $(this).removeClass('field-error');
            }
        });

        if (!form.find('.field-error').length) {
            form.find('.form-error').fadeOut(1000);
        }

        return error;
    }
    
    // Remove screen when user clicks on the map, then add it again when they scroll
    
    $('.screen').click(function(){
    	$(this).removeClass('screen');
    });
    
    $(window).scroll(function(){
    	$('.contact-2 .map-holder').addClass('screen');
    });

}); 

 
