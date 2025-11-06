"use client";

import React, { useState } from "react";
import { Users, Shuffle, ChevronRight, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

type Equipe = {
  emoji: string;
  membres: string[];
};

type GenerateurEquipesProps = {
  isOpen: boolean;
  onClose: () => void;
  onEquipesGenerees: (equipes: Equipe[]) => void;
};

const teamEmojis = ["🐵", "🦁", "🐼", "🦊", "🐯", "🐨", "🐺", "🦝"];

export default function GenerateurEquipes({
  isOpen,
  onClose,
  onEquipesGenerees,
}: GenerateurEquipesProps) {
  const { t } = useTranslation('equipes');
  const [currentStep, setCurrentStep] = useState(1);
  const [numPlayers, setNumPlayers] = useState("");
  const [numTeams, setNumTeams] = useState("");
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [teams, setTeams] = useState<Equipe[]>([]);

  const resetModal = () => {
    setCurrentStep(1);
    setNumPlayers("");
    setNumTeams("");
    setPlayerNames([]);
    setTeams([]);
  };

  const closeModal = () => {
    resetModal();
    onClose();
  };

  const handleStep1Next = () => {
    if (numPlayers && parseInt(numPlayers) > 0) {
      setPlayerNames(Array(parseInt(numPlayers)).fill(""));
      setCurrentStep(2);
    }
  };

  const handleStep2Next = () => {
    if (numTeams && parseInt(numTeams) > 0) {
      const playersCount = parseInt(numPlayers);
      const teamsCount = parseInt(numTeams);
      const remainder = playersCount % teamsCount;

      if (remainder !== 0) {
        setCurrentStep(3);
      } else {
        generateTeams();
        setCurrentStep(4);
      }
    }
  };

  const handlePlayerNameChange = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const generateTeams = () => {
    const filledNames = playerNames.map(
      (name, idx) => name.trim() || `Joueur ${idx + 1}`
    );

    const shuffled = [...filledNames].sort(() => Math.random() - 0.5);
    const teamsCount = parseInt(numTeams);
    const newTeams = Array(teamsCount)
      .fill(null)
      .map(() => [] as string[]);

    shuffled.forEach((player, idx) => {
      newTeams[idx % teamsCount].push(player);
    });

    setTeams(
      newTeams.map((team, idx) => ({
        emoji: teamEmojis[idx % teamEmojis.length],
        membres: team,
      }))
    );
  };

  const regenerateTeams = () => {
    generateTeams();
  };

  const confirmTeams = () => {
    setCurrentStep(5);
    setTimeout(() => {
      onEquipesGenerees(teams);
      closeModal();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Shuffle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            {t('generateurEquipes')}
          </DialogTitle>
        </DialogHeader>

        {/* Barre de progression */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full transition-all ${
                  step <= currentStep ? "bg-blue-500" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center mb-4">
            {t('etape', { current: currentStep, total: 5 })}
          </p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep === 1 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-semibold">{t('combienJoueurs')}</h3>
              <Input
                type="number"
                min="1"
                value={numPlayers}
                onChange={(e) => setNumPlayers(e.target.value)}
                placeholder="Ex: 8"
                className="max-w-xs mx-auto text-center text-2xl font-semibold"
              />
              <Button
                onClick={handleStep1Next}
                disabled={!numPlayers || parseInt(numPlayers) <= 0}
                className="flex items-center gap-2"
              >
                Suivant
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shuffle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  Combien d&apos;équipes ?
                </h3>
                <Input
                  type="number"
                  min="2"
                  max={numPlayers}
                  value={numTeams}
                  onChange={(e) => setNumTeams(e.target.value)}
                  placeholder="Ex: 2"
                  className="max-w-xs mx-auto text-center text-2xl font-semibold mb-6"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">
                  Noms des joueurs (optionnel)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                  {playerNames.map((name, idx) => (
                    <Input
                      key={idx}
                      type="text"
                      value={name}
                      onChange={(e) =>
                        handlePlayerNameChange(idx, e.target.value)
                      }
                      placeholder={`Joueur ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <Button
                onClick={handleStep2Next}
                disabled={!numTeams || parseInt(numTeams) < 2}
                className="w-full flex items-center justify-center gap-2"
              >
                Générer les équipes
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center space-y-6">
              <div className="text-6xl">😨</div>
              <h3 className="text-2xl font-semibold">
                Olalala un joueur va se retrouver tout seul…
              </h3>
              <p className="text-muted-foreground">
                Avec {numPlayers} joueurs et {numTeams} équipes, certaines
                équipes auront plus de membres que d&apos;autres.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Oh oh, on réfléchit
                </Button>
                <Button
                  onClick={() => {
                    generateTeams();
                    setCurrentStep(4);
                  }}
                >
                  Pas grave
                </Button>
              </div>
            </div>
          )}

          {/* Étape 4: Affichage et confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2">
                  Est-ce que tout est ok ?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Vérifie les équipes générées
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teams.map((team, idx) => (
                  <div key={idx} className="bg-muted/50 rounded-xl p-4 border">
                    <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">
                      {team.emoji} Équipe {idx + 1}
                    </h4>
                    <ul className="space-y-1">
                      {team.membres.map((player, pIdx) => (
                        <li
                          key={pIdx}
                          className="text-sm flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {player}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={regenerateTeams}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  {t('regenerer', { ns: 'commun' })}
                </Button>
                <Button onClick={confirmTeams} className="flex-1">
                  {t('valider', { ns: 'commun' })}
                </Button>
              </div>
            </div>
          )}

          {/* Étape 5: Chargement */}
          {currentStep === 5 && (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h3 className="text-2xl font-semibold">
                {t('peuplement')}
              </h3>
              <p className="text-muted-foreground">{t('enregistrement')}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
