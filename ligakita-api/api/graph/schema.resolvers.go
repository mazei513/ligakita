package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/lucsky/cuid"
	"github.com/mazei513/ligakita/ligakita-api/api/graph/generated"
	"github.com/mazei513/ligakita/ligakita-api/api/graph/model"
)

func (r *mutationResolver) NewTournament(ctx context.Context, name string, players []string) (*model.TournamentInfo, error) {
	if strings.TrimSpace(name) == "" {
		return nil, errors.New("400: name is required")
	}
	np := len(players)
	if np <= 1 || np&(np-1) == 0 {
		return nil, errors.New("400: needs power of 2 of players")
	}

	ps := make([]*model.Player, 0, np)
	for _, p := range players {
		ps = append(ps, &model.Player{
			UID: cuid.New(), Name: p,
		})
	}

	t := &model.TournamentInfo{
		UID: cuid.New(), Name: name,
		Matches: []*model.Match{}, Players: ps,
	}
	r.tournaments = append(r.tournaments, t)
	return t, nil
}

func (r *queryResolver) Tournament(ctx context.Context, uid string) (*model.TournamentInfo, error) {
	var f *model.TournamentInfo
	for _, t := range r.tournaments {
		if t.UID != uid {
			continue
		}
		f = t
	}
	if f == nil {
		return nil, fmt.Errorf("404: tournament UID %s not found", uid)
	}
	return f, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
