package main

import (
	"log"

	mysqlDb "github.com/Sahil-Mandaliya/Order/backend/pkg/mysql"
	routes "github.com/Sahil-Mandaliya/Order/backend/routes"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	mysqlDb.InitDB()
	connection := mysqlDb.DBConnection()
	db, err := connection.DB()
	if err != nil {
		log.Fatalln(err)
	}
	defer db.Close()
	routes.Routers()
}

/***************************************************/

// // Get all users
// func GetUsers(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	var users []User
// 	result, err := db.Query("SELECT id, first_name," +
// 		"last_name,email from users")
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	defer result.Close()
// 	for result.Next() {
// 		var user User
// 		err := result.Scan(&user.ID, &user.FirstName,
// 			&user.LastName, &user.Email)
// 		if err != nil {
// 			panic(err.Error())
// 		}
// 		users = append(users, user)
// 	}
// 	json.NewEncoder(w).Encode(users)
// }

// // Get all orders
// func GetOrders(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	var orders []Order
// 	result, err := db.Query("SELECT id, user_id," +
// 		"price, order_date from orders")
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	defer result.Close()
// 	for result.Next() {
// 		var order Order
// 		err := result.Scan(&order.ID, &order.UserID,
// 			&order.Price, &order.OrderDate)
// 		if err != nil {
// 			panic(err.Error())
// 		}
// 		orders = append(orders, order)
// 	}
// 	json.NewEncoder(w).Encode(orders)
// }

// // Create user
// func CreateUser(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("\n\n\n\n\n\n\n\n rrrr = ")
// 	w.Header().Set("Content-Type", "application/json")
// 	stmt, err := db.Prepare("INSERT INTO users(first_name," +
// 		"last_name,email) VALUES(?,?,?)")
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	body, err := ioutil.ReadAll(r.Body)
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	keyVal := make(map[string]string)
// 	json.Unmarshal(body, &keyVal)
// 	first_name := keyVal["firstname"]
// 	last_name := keyVal["lastname"]
// 	email := keyVal["email"]
// 	_, err = stmt.Exec(first_name, last_name, email)
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	fmt.Fprintf(w, "New user was created")
// }

// // Create order
// func CreateOrder(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("\n\n\n\n\n\n\n\n rrrr ordrrrrr= ")
// 	w.Header().Set("Content-Type", "application/json")
// 	stmt, err := db.Prepare("INSERT INTO orders(user_id," +
// 		"price) VALUES(?,?)")
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	body, err := ioutil.ReadAll(r.Body)
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	keyVal := make(map[string]string)
// 	json.Unmarshal(body, &keyVal)
// 	fmt.Println("\n\n\n\n\n\n\n\n rrrr keyValkeyVal= ", keyVal)
// 	userid := keyVal["userid"]
// 	price := keyVal["price"]
// 	// order_date := keyVal["order_date"]
// 	// orderDate, _ := time.Parse("0001-01-01 00:00:00 +0000 UTC", order_date)
// 	// fmt.Println("\n\n\n\n\n\n\n = order_date = ", userid, price, order_date, orderDate)
// 	_, err = stmt.Exec(userid, price)
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	fmt.Fprintf(w, "New order was created")
// }

// // Get user by ID
// func GetUser(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	params := mux.Vars(r)
// 	result, err := db.Query("SELECT id, first_name,"+
// 		"last_name,email from users WHERE id = ?", params["id"])
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	defer result.Close()
// 	var user User
// 	for result.Next() {
// 		err := result.Scan(&user.ID, &user.FirstName,
// 			&user.LastName, &user.Email)
// 		if err != nil {
// 			panic(err.Error())
// 		}
// 	}
// 	json.NewEncoder(w).Encode(user)
// }

// // Update user
// func UpdateUser(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	params := mux.Vars(r)
// 	stmt, err := db.Prepare("UPDATE users SET first_name = ?," +
// 		"last_name= ?, email=? WHERE id = ?")
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	body, err := ioutil.ReadAll(r.Body)
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	keyVal := make(map[string]string)
// 	json.Unmarshal(body, &keyVal)
// 	first_name := keyVal["firstName"]
// 	last_name := keyVal["lastName"]
// 	email := keyVal["email"]
// 	_, err = stmt.Exec(first_name, last_name, email,
// 		params["id"])
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	fmt.Fprintf(w, "User with ID = %s was updated",
// 		params["id"])
// }

// // Delete User
// func DeleteUser(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	params := mux.Vars(r)
// 	stmt, err := db.Prepare("DELETE FROM users WHERE id = ?")
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	_, err = stmt.Exec(params["id"])
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	fmt.Fprintf(w, "User with ID = %s was deleted",
// 		params["id"])
// }

// /***************************************************/

// type User struct {
// 	ID        string `json:"id"`
// 	FirstName string `json:"firstName"`
// 	LastName  string `json:"lastName"`
// 	Email     string `json:"email"`
// }

// type Order struct {
// 	ID        string    `gorm:"id; json:id"`
// 	UserID    string    `gorm:"user_id; json:user_id"`
// 	Price     string    `gorm:"price; json:price"`
// 	OrderDate time.Time `gorm:"order_date; json:order_date"`
// }
