const data = {
    "name": "John",
    "age": 22,
    "hobby": {
	"reading" : true,
	"gaming" : false,
	"sport" : "football"
    },
    "class" : ["JavaScript", "HTML", "CSS"]
}

a= {
	"items":
		{
			"item":
				[
					{
						"id": "0001",
						"type": "donut",
						"name": "Cake",
						"ppu": 0.55,
						"batters":
							{
								"batter":
									[
										{ "id": "1001", "type": "Regular" },
										{ "id": "1002", "type": "Chocolate" },
										{ "id": "1003", "type": "Blueberry" },
										{ "id": "1004", "type": "Devil's Food" }
									]
							},
						"topping":
							[
								{ "id": "5001", "type": "None" },
								{ "id": "5002", "type": "Glazed" },
								{ "id": "5005", "type": "Sugar" },
								{ "id": "5007", "type": "Powdered Sugar" },
								{ "id": "5006", "type": "Chocolate with Sprinkles" },
								{ "id": "5003", "type": "Chocolate" },
								{ "id": "5004", "type": "Maple" }
							]
					},
					{
						"id": "0002",
						"type": "donut",
						"name": "Raised",
						"ppu": 0.55,
						"batters":
							{
								"batter":
									[
										{ "id": "1001", "type": "Regular" }
									]
							},
						"topping":
							[
								{ "id": "5001", "type": "None" },
								{ "id": "5002", "type": "Glazed" },
								{ "id": "5005", "type": "Sugar" },
								{ "id": "5003", "type": "Chocolate" },
								{ "id": "5004", "type": "Maple" }
							]
					},
		
					{
						"id": "0003",
						"type": "donut",
						"name": "Old Fashioned",
						"ppu": 0.55,
						"batters":
							{
								"batter":
									[
										{ "id": "1001", "type": "Regular" },
										{ "id": "1002", "type": "Chocolate" }
									]
							},
						"topping":
							[
								{ "id": "5001", "type": "None" },
								{ "id": "5002", "type": "Glazed" },
								{ "id": "5003", "type": "Chocolate" },
								{ "id": "5004", "type": "Maple" }
							]
					},
					{
						"id": "0004",
						"type": "bar",
						"name": "Bar",
						"ppu": 0.75,
						"batters":
							{
								"batter":
									[
										{ "id": "1001", "type": "Regular" },
									]
							},
						"topping":
							[
								{ "id": "5003", "type": "Chocolate" },
								{ "id": "5004", "type": "Maple" }
							],
						"fillings":
							{
								"filling":
									[
										{ "id": "7001", "name": "None", "addcost": 0 },
										{ "id": "7002", "name": "Custard", "addcost": 0.25 },
										{ "id": "7003", "name": "Whipped Cream", "addcost": 0.25 }
									]
							}
					},

					{
						"id": "0005",
						"type": "twist",
						"name": "Twist",
						"ppu": 0.65,
						"batters":
							{
								"batter":
									[
										{ "id": "1001", "type": "Regular" },
									]
							},
						"topping":
							[
								{ "id": "5002", "type": "Glazed" },
								{ "id": "5005", "type": "Sugar" },
							]
					},

					{
						"id": "0006",
						"type": "filled",
						"name": "Filled",
						"ppu": 0.75,
						"batters":
							{
								"batter":
									[
										{ "id": "1001", "type": "Regular" },
									]
							},
						"topping":
							[
								{ "id": "5002", "type": "Glazed" },
								{ "id": "5007", "type": "Powdered Sugar" },
								{ "id": "5003", "type": "Chocolate" },
								{ "id": "5004", "type": "Maple" }
							],
						"fillings":
							{
								"filling":
									[
										{ "id": "7002", "name": "Custard", "addcost": 0 },
										{ "id": "7003", "name": "Whipped Cream", "addcost": 0 },
										{ "id": "7004", "name": "Strawberry Jelly", "addcost": 0 },
										{ "id": "7005", "name": "Rasberry Jelly", "addcost": 0 }
									]
							}
					}
				]
		}
}


// /const obj = JSON.parse(jsonData); to convert json data to javascript object
// JSON.stringify(javascrSince the objects in JavaScript can inherit properties from their prototypes, the for...in statement will loop through those properties as well.iptobj)


    Object.values(a).map((value)=>{
        Object.values(value).map((value)=>{
                        value.forEach((value)=>{
                            if(value['id']=='0005')
                            {
                                console.log(value.batters.batter);
                            }

                        })
                        
                        })
                        
                            
                        })
                        
                
    
    
    

    