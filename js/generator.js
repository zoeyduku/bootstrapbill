function Generator()
{
	var _x = this;
	
	this.toggleswitch = function (o,c) 
		{	
			
			var n = 
				{ domel=false, cssclass=false, click=false }; 
				
			for (var i in o)
				{ 
					if (i in n){n[i] = o[i]}
				}
		}
		
	var toggleswitch = $('<div>').addClass('toggleswitch');
		
		if (n.cssclass !== false) 
			{
				toggleswitch.addClass(n.cssclass);
			}
					
	var togglebutton = $('<div>').addClass('togglebutton');
			
	toggleswitch.append(togglebutton);
			
	toggleswitch.on ('click', function()
								{
									if ($this).hasClass('selected')
					
										{
											$(this).removeClass('selected');
											
											{
												else
													{
														$(this).addClass('selected');
													}
											
												if (n.click !== false)
													{
														n.click ({domel = $(this)});
													}
											}
					);
					
					
								
	if (n.domel !==false )
		{
			n.domel.append(toggleswitch); 
		}
					
	if (c)
		{
		c(null, toggleswitch; toggleswitch 
			{
				else 
				{
					return toggleswitch;}
					
					
			};
		}
		
}