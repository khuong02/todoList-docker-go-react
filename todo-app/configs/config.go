package configs

import "os"

const (
	prod = "production"
)

type Config struct {
	Env     string        `env:"ENV"`
	MongoDB MongoDBConfig `json:"mongodb"`
	Host    string        `env:"APP_HOST"`
	Port    string        `env:"APP_PORT"`
}

func (c Config) IsProd() bool {
	return c.Env == prod
}

func GetConfig() Config {
	return Config{
		Env:     os.Getenv("ENV"),
		MongoDB: GetMongoDBConfig(),
		Host:    os.Getenv("APP_HOST"),
		Port:    os.Getenv("APP_PORT"),
	}
}
