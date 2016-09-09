$(document).ready(function(){
	// JS Array implementation, overlap mode
	$( '#menu' ).multilevelpushmenu({
		menu: arrMenu,
		containersToPush: [$( '#pushobj' )],
		//Pour cacher le menu au demarrage changer pushobj.left dans basicjs.css : 300 ou 60 selon collapsed ou non 
		collapsed: true,
		// Just for fun also changing the look of the menu
		wrapperClass: 'mlpm_w',
		menuInactiveClass: 'mlpm_inactive',
		
		
		onItemClick: function() {
            var event = arguments[0],
			$menuLevelHolder = arguments[1],
			$item = arguments[2],
			options = arguments[3],
			title = $menuLevelHolder.find( 'h2:first' ).text(),
			itemName = $item.find( 'a:first' ).text();
			
            console.log( '<br />Item <i>' + itemName + '</i>' + ' on <i>' + title + '</i> menu level clicked!' );
            console.log(arguments);
			console.log($item.find( 'a:first' ));
			
			
			switch(itemName) {
				case "Toogle Texte" :
				toogleTexte()
				break;
				case "Toogle Liens" :
				toogleLiens()
				break;
				case "Toogle Noeuds" :
				toogleNoeuds()
				break;
				case "Reset Camera" :
				resetCam()
				break;
				case "room1" : 
				switchRoom("room1");
				break;
				case "room2" : 
				switchRoom("room2");
				break;
				case "room3" : 
				switchRoom("room3 swing");
				break;
				case "Nouvelle Room" : 
				switchRoom(prompt("Quelle est le nom du nouveau graphe ?", "nomnom"));
				break;
				default :
				console.log("menu non traite  :"+itemName);
			}
		}
		
	});
	
	//test d'ajout pour update des rooms http://multi-level-push-menu.make.rs/
	var addItems = [
		{
			name: 'iPhone',
			id: 'iPhoneItem',
			icon: 'fa fa-phone-square',
			link: '#',
			items: [
				{
					title: 'iPhones',
					id: 'iPhonesMenu',
					icon: 'fa fa-phone-square',
					items: [
						{
							name: 'iPhone 4',
							icon: 'fa fa-phone-square',
							link: '#'
						},
						{
							name: 'iPhone 5',
							icon: 'fa fa-phone-square',
							link: '#'
						}
					]
				}
			]
		},
		{
			name: 'Samsung',
			icon: 'fa fa-phone-square',
			link: '#',
			items: [
				{
					title: 'Samsung',
					icon: 'fa fa-phone-square',
					items: [
						{
							name: 'Samsung Galaxy S II',
							icon: 'fa fa-phone-square',
							link: '#'
						},
						{
							name: 'Samsung Galaxy S III',
							icon: 'fa fa-phone-square',
							link: '#'
						},
						{
							name: 'Samsung Galaxy S IV',
							icon: 'fa fa-phone-square',
							link: '#'
						}
					]
				}
			]
		}
	];
    /*
    AJOUT DES MENUS ROOMS SI SOCKET ACTIF
	var $addTo = $( '#menu' ).multilevelpushmenu( 'findmenusbytitle' , 'Rooms' ).first();
	$( '#menu' ).multilevelpushmenu( 'additems' , addItems , $addTo , 4 ); */
});

// JS Aray instead HTML Markup

var arrMenu = [
	{
		title: 'All Categories',
		icon: 'fa fa-reorder',
		items: [
			{
				name: 'Affichage',
				icon: 'fa fa-laptop',
				link: '#',
				items: [
					{
						title: 'Affichage',
						icon: 'fa fa-laptop',
						items: [
							{
								name: 'Reset Camera',
								link: '#'
							},
							{
								name: 'Toogle Texte',
								link: '#',
							},
							{
								name: 'Toogle Liens',
								link: '#',
							},
							{
								name: 'Toogle Noeuds',
								link: '#',
							},
							
							{
								name: 'Televisions',
								icon: 'fa fa-desktop',
								link: '#',
								items: [
									{
										title: 'Televisions',
										icon: 'fa fa-desktop',
										link: '#',
										items: [
											{
												name: 'Flat Super Screen',
												link: '#'
											},
											{
												name: 'Gigantic LED',
												link: '#'
											},
											{
												name: 'Power Eater',
												link: '#'
											},
											{
												name: '3D Experience',
												link: '#'
											},
											{
												name: 'Classic Comfort',
												link: '#'
											}
										]
									}
								]
							},
							{
								name: 'Cameras',
								icon: 'fa fa-camera-retro',
								link: '#',
								items: [
									{
										title: 'Cameras',
										icon: 'fa fa-camera-retro',
										link: '#',
										items: [
											{
												name: 'Smart Shot',
												link: '#'
											},
											{
												name: 'Power Shooter',
												link: '#'
											},
											{
												name: 'Easy Photo Maker',
												link: '#'
											},
											{
												name: 'Super Pixel',
												link: '#'
											}
										]
									}
								]
							}
						]
					}
				]
			},
			{
				name: 'Rooms',
				icon: 'fa fa-camera-retro',
				link: '#',
				items: [
					{
						title: 'Rooms',
						icon: 'fa fa-camera-retro',
						link: '#',
						items: [
							{
								name: 'room1',
								link: '#'
							},
							{
								name: 'room2',
								link: '#'
							},
							{
								name: 'room3',
								link: '#'
							},
							{
								name: 'Nouvelle Room',
								link: '#'
							}
						]
					}
				]
			},
			{
				name: 'Devices',
				icon: 'fa fa-laptop',
				link: '#',
				items: [
					{
						title: 'Devices',
						icon: 'fa fa-laptop',
						items: [
							{
								name: 'Mobile Phones',
								icon: 'fa fa-phone',
								link: '#',
								items: [
									{
										title: 'Mobile Phones',
										icon: 'fa fa-phone',
										link: '#',
										items: [
											{
												name: 'Super Smart Phone',
												link: '#'
											},
											{
												name: 'Thin Magic Mobile',
												link: '#'
											},
											{
												name: 'Performance Crusher',
												link: '#'
											},
											{
												name: 'Futuristic Experience',
												link: '#'
											}
										]
									}
								]
							},
							{
								name: 'Televisions',
								icon: 'fa fa-desktop',
								link: '#',
								items: [
									{
										title: 'Televisions',
										icon: 'fa fa-desktop',
										link: '#',
										items: [
											{
												name: 'Flat Super Screen',
												link: '#'
											},
											{
												name: 'Gigantic LED',
												link: '#'
											},
											{
												name: 'Power Eater',
												link: '#'
											},
											{
												name: '3D Experience',
												link: '#'
											},
											{
												name: 'Classic Comfort',
												link: '#'
											}
										]
									}
								]
							},
							{
								name: 'Cameras',
								icon: 'fa fa-camera-retro',
								link: '#',
								items: [
									{
										title: 'Cameras',
										icon: 'fa fa-camera-retro',
										link: '#',
										items: [
											{
												name: 'Smart Shot',
												link: '#'
											},
											{
												name: 'Power Shooter',
												link: '#'
											},
											{
												name: 'Easy Photo Maker',
												link: '#'
											},
											{
												name: 'Super Pixel',
												link: '#'
											}
										]
									}
								]
							}
						]
					}
				]
			},
			{
				name: 'Magazines',
				icon: 'fa fa-book',
				link: '#',
				items: [
					{
						title: 'Magazines',
						icon: 'fa fa-book',
						items: [
							{
								name: 'National Geographics',
								link: '#'
							},
							{
								name: 'Scientific American',
								link: '#'
							},
							{
								name: 'The Spectator',
								link: '#'
							},
							{
								name: 'Rambler',
								link: '#'
							},
							{
								name: 'Physics World',
								link: '#'
							},
							{
								name: 'The New Scientist',
								link: '#'
							}
						]
					}
				]
			},
			{
				name: 'Store',
				icon: 'fa fa-shopping-cart',
				link: '#',
				items: [
					{
						title: 'Store',
						icon: 'fa fa-shopping-cart',
						items: [
							{
								name: 'Clothes',
								icon: 'fa fa-tags',
								link: '#',
								items: [
									{
										title: 'Clothes',
										icon: 'fa fa-tags',
										items: [
											{
												name: 'Women\'s Clothing',
												icon: 'fa fa-female',
												link: '#',
												items: [
													{
														title: 'Women\'s Clothing',
														icon: 'fa fa-female',
														items: [
															{
																name: 'Tops',
																link: '#'
															},
															{
																name: 'Dresses',
																link: '#'
															},
															{
																name: 'Trousers',
																link: '#'
															},
															{
																name: 'Shoes',
																link: '#'
															},
															{
																name: 'Sale',
																link: '#'
															}
														]
													}
												]
											},
											{
												name: 'Men\'s Clothing',
												icon: 'fa fa-male',
												link: '#',
												items: [
													{
														title: 'Men\'s Clothing',
														icon: 'fa fa-male',
														items: [
															{
																name: 'Shirts',
																link: '#'
															},
															{
																name: 'Trousers',
																link: '#'
															},
															{
																name: 'Shoes',
																link: '#'
															},
															{
																name: 'Sale',
																link: '#'
															}
														]
													}
												]
											}
										]
									}
								]
							},
							{
								name: 'Jewelry',
								link: '#'
							},
							{
								name: 'Music',
								link: '#'
							},
							{
								name: 'Grocery',
								link: '#'
							}
						]
					}
				]
			},
			{
				name: 'Ontologies',
				link: '#'
			},
			{
				name: 'Collections',
				link: '#'
			},
			{
				name: 'Aide',
				link: '#'
			},
			{
				name: 'Credits',
				link: '#'
			}
		]
	}
];