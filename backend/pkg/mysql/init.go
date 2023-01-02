package mysql

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB
var err error

func InitDB() error {
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := "root:@tcp(127.0.0.1:3306)/userdb?charset=utf8mb4&parseTime=True&loc=Local"
	gdb, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}
	db = gdb
	return nil
}

func DBConnection() *gorm.DB {
	return db
}

// package mysql

// import (
// 	"database/sql"
// 	"log"

// 	_ "github.com/go-sql-driver/mysql"
// )

// // Db configuration
// var db *sql.DB
// var err error

// func InitDB() {
// 	db, err = sql.Open("mysql",
// 		"root:@tcp(127.0.0.1:3306)/userdb")
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	log.Println("Database initialised successfully")
// }

// func DBConnection() *sql.DB {
// 	return db
// }
